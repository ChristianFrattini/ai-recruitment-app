"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { FileSearch, Loader2, MessageCircleQuestion } from "lucide-react";
import React, { useEffect, useState } from "react";

import { candidateType } from "@/types/candidate.types";
import { getQueryEmbedding } from "@/lib/embeddingsFunctions";
import CandidateCard from "./CandidateCard";

const words = [
  {
    text: "Enter",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "a",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "job",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "description",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "and",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "find ",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "the",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-500 tracking-normal",
  },
  {
    text: "right",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-slate-800 tracking-normal",
  },
  {
    text: "candidate!  ",
    className:
      "text-xl md:text-2xl lg:text-3xl font-semibold text-slate-800 tracking-normal",
  },
];

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB);
}

function isQueryRelevant(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  const irrelevantPatterns = [
    "hello",
    "hi",
    "hey",
    "how are you",
    "what's up",
    "good morning",
    "good evening",
    "test",
    "asdf",
  ];
  return !irrelevantPatterns.some((pattern) => lowerQuery.includes(pattern));
}

export default function Search({ candidates }: { candidates: candidateType }) {
  const [query, setQuery] = useState("");
  type CandidateWithScore = (typeof candidates)[number] & { score: number };

  const [filtered, setFiltered] = useState<CandidateWithScore[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [irrelevantWarning, setIrrelevantWarning] = useState(false);

  const handleSearch = async () => {
    if (filtered) {
      setFiltered(null);
    }

    if (!query.trim()) return;

    console.log("Query", isQueryRelevant(query));

    if (!isQueryRelevant(query)) {
      setIrrelevantWarning(true);
      return;
    }
    setIrrelevantWarning(false);

    console.log("irrelevant?", irrelevantWarning);

    setLoading(true); // start loading

    const queryEmbedding = await getQueryEmbedding(query);

    const scored: CandidateWithScore[] = candidates
      .map((c) => ({
        ...c,
        score: cosineSimilarity(queryEmbedding, c.embedding),
      }))
      .sort((a, b) => b.score - a.score);

    setFiltered(scored.slice(0, 6)); // top 6 results
    console.log("filtered;", filtered);
    setLoading(false);
  };

  useEffect(() => {
    if (filtered) {
      console.log("Filtered results:", filtered);
    }
  }, [filtered]);

  return (
    <div className="mt-16 px-4 mb-40">
      <div className="w-full flex flex-col gap-12 justify-center items-center">
        <TypewriterEffect words={words} delay={0.05} />

        <div className="relative w-full max-w-[1000px] mt-10 px-2 sm:px-4 py-4  rounded-2xl flex justify-center items-center">
          <Input
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 sm:h-16 md:h-20 pr-16 sm:pr-20 rounded-2xl text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg"
            placeholder="Type the job description or requirements to find a candidate"
          />
          <Button
            variant={"outline"}
            type="button"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full flex items-center justify-center hover:cursor-pointer"
            onClick={handleSearch}
          >
            <FileSearch className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {loading && (
          <div className={"flex flex-col items-center justify-center mt-10"}>
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-center text-muted-foreground mt-2">
              Searching for candidates...
            </p>
          </div>
        )}

        {irrelevantWarning && (
          <div className={"flex flex-col items-center justify-center mt-10"}>
            <MessageCircleQuestion className="h-8 w-8  text-yellow-500 mx-auto" />
            <p className="text-center text-muted-foreground mt-2">
              Please enter a search related to a candidate.
            </p>
          </div>
        )}
        {filtered && filtered.length > 0 && (
          <>
            {filtered[0].score < 0.3 && (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-sm font-medium">
                No strong match found for your search — showing closest
                candidate instead.
              </div>
            )}

            {filtered.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </>
        )}

        {filtered && filtered.length === 0 && (
          <div className="text-center text-muted-foreground mt-4">
            No candidates matched your search.
          </div>
        )}
      </div>
    </div>
  );
}
