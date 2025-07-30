"use server";

import { SubmissionResult } from "@conform-to/react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createEmbedding(
  cvText: string,
): Promise<SubmissionResult<string[]> | number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: cvText,
    });

    const embedding = response.data[0].embedding;
    console.log("Embedding created successfully:", embedding);
    return embedding;
  } catch (error) {
    console.error("Embedding error:", error);
    return {
      status: "error",
      error: {
        _global: ["Failed to generate embedding from CV text."],
      },
    } satisfies SubmissionResult<string[]>;
  }
}

export async function getQueryEmbedding(query: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });
  return response.data[0].embedding;
}

export async function isQueryRelevant(query: string): Promise<boolean> {
  const systemPrompt = `You are an assistant that helps classify user input. Only respond with "yes" or "no".`;
  const userPrompt = `Is the following input related to searching for job candidates, resumes, skills, or job requirements?\n\n"${query}"`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0,
  });

  const answer = res.choices[0].message.content?.trim().toLowerCase();
  return answer === "yes";
}
