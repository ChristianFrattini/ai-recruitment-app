"use server";

import prisma from "@/lib/db";
import { fetchUser } from "@/lib/fetchData";
import {
  candidateSchema,
  editCandidateSchema,
  orgSchema,
  profileSchema,
} from "@/lib/zodSchemas";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
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

export async function editCandidate(prevState: unknown, formData: FormData) {
  const user = await fetchUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: editCandidateSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const cvtext = formData.get("cvText") as string;
  const lines = cvtext.split("\n");
  const cvTextTrimmed = lines.slice(0, -2).join("\n");

  const level = submission.value.level;
  const salary = submission.value.salaryExpectation;

  const appendedInfo = `\n\nExperience Level: ${level}\nSalary Expectation: ${salary}`;

  const finalCVText = cvTextTrimmed + appendedInfo;

  const candidateId = formData.get("id") as string;

  try {
    await prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        name: submission.value.name,
        email: submission.value.email,
        phone: submission.value.phone,
        level: submission.value.level,
        status: submission.value.status,
        salaryExpectation: submission.value.salaryExpectation,

        cvText: finalCVText,

        uploadedById: user.id,
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
  return redirect("/dashboard/cvlibrary");
}

export async function deleteCandidate(formData: FormData) {
  const candidateId = formData.get("candidateId") as string;
  await prisma.candidate.delete({
    where: { id: candidateId },
  });
  return redirect("/dashboard/cvlibrary");
}

export async function removeMember(formData: FormData) {
  const memberId = formData.get("memberId") as string;
  await prisma.user.delete({
    where: { id: memberId },
  });
  return redirect("/dashboard/profile");
}

export async function updateAdmins(formData: FormData) {
  const entries = formData.getAll("user") as string[];

  for (const entry of entries) {
    const [id, isAdminStr] = entry.split(":");
    const isAdmin = isAdminStr === "true";

    await prisma.user.update({
      where: { id },
      data: { isAdmin },
    });
  }
}
