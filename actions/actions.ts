"use server";

import prisma from "@/lib/db";
import { fetchUser } from "@/lib/fetchData";
import { candidateSchema, orgSchema, profileSchema } from "@/lib/zodSchemas";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import pdfParse from "pdf-parse";
import { PDFParser } from "pdf2json";
import pdf from "pdf-parse"; // Alternative simpler library
import { createEmbedding } from "@/lib/embeddingsFunctions";
import { summarizeText } from "@/lib/createSummary";

export async function editOrg(prevState: unknown, formData: FormData) {
  const user = await fetchUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: orgSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const productId = formData.get("orgId") as string;
  await prisma.organization.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      isUpdated: true,
    },
  });
  redirect("/dashboard/profile");
}

export async function editProfile(prevState: unknown, formData: FormData) {
  const user = await fetchUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: profileSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const userId = formData.get("profileId") as string;
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      specialization: submission.value.specialization,
      title: submission.value.title,
    },
  });
  redirect("/dashboard/profile");
}

export async function saveCandidate(prevState: unknown, formData: FormData) {
  const user = await fetchUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: candidateSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const file = formData.get("file") as File | null;

  if (!file) {
    return {
      status: "error",
      error: {
        file: ["CV file is required."],
      },
    } satisfies SubmissionResult<string[]>;
  }

  let extractedText: string;

  try {
    // Read the file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Convert to Buffer (pdf-parse works with Buffer)
    const buffer = Buffer.from(arrayBuffer);

    // Parse the PDF
    const data = await pdf(buffer);
    extractedText = data.text;
  } catch (error) {
    console.error("PDF parsing error:", error);
    return {
      status: "error",
      error: {
        file: ["Failed to parse PDF file. Please ensure it's a valid PDF."],
      },
    } satisfies SubmissionResult<string[]>;
  }

  const summary = await summarizeText(extractedText);

  const embeddingResult = await createEmbedding(extractedText);

  if ("status" in embeddingResult && embeddingResult.status === "error") {
    return embeddingResult;
  }

  const level = submission.value.level;
  const salary = submission.value.salaryExpectation;

  const appendedInfo = `\n\nExperience Level: ${level}\nSalary Expectation: ${salary}`;

  const finalCVText = extractedText + appendedInfo;

  const embedding = embeddingResult as number[];

  // TODO: Upload the actual file to S3 / Vercel Blob and get URL
  const cvUrl = "cv-url-placeholder";

  try {
    await prisma.candidate.create({
      data: {
        name: submission.value.name,
        email: submission.value.email,
        phone: submission.value.phone,
        level: submission.value.level,
        status: submission.value.status,
        salaryExpectation: submission.value.salaryExpectation,
        cvUrl,
        cvText: finalCVText,
        cvSummary: summary || "Summary Unavailable.",
        uploadedById: user.id,
        embedding: embedding,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return {
      status: "error",
      error: {
        _global: ["Failed to save candidate to database."],
      },
    } satisfies SubmissionResult<string[]>;
  }

  return redirect("/dashboard/addcv");
}
