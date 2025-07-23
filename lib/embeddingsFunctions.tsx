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
