"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { FileSearch, Loader2, MessageCircleQuestion } from "lucide-react";
import React, { useEffect, useState } from "react";

import { candidateType } from "@/types/candidate.types";
import { getQueryEmbedding, isQueryRelevant } from "@/lib/embeddingsFunctions";
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

    setIrrelevantWarning(false);
    setLoading(true); // start loading

    if (!(await isQueryRelevant(query))) {
      setIrrelevantWarning(true);
      setLoading(false); // start loading
      return;
    }
    setIrrelevantWarning(false);

    console.log("irrelevant?", irrelevantWarning);

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
    <div className="mt-12 px-3 sm:px-6 md:px-10 mb-32">
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        {/* Animated Title */}
        <TypewriterEffect words={words} delay={0.05} />

        {/* Search Bar */}
        <div className="relative w-full max-w-[900px] mt-8 px-2 sm:px-4 py-3 sm:py-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <Input
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 sm:h-14 md:h-16 pr-14 sm:pr-20 rounded-2xl text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg"
            placeholder="Type the job description or requirements..."
          />
          <Button
            variant="outline"
            type="button"
            className="absolute sm:static right-3  sm:right-0 top-[40%] sm:top-auto -translate-y-1/2 sm:translate-y-0 mt-2 sm:mt-0 h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full flex items-center justify-center"
            onClick={handleSearch}
          >
            <FileSearch className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 space-y-4 w-full max-w-[900px] mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center mt-8">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base">
              Searching for candidates...
            </p>
          </div>
        )}

        {irrelevantWarning && (
          <div className="flex flex-col items-center justify-center mt-8">
            <MessageCircleQuestion className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto" />
            <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base">
              Please enter a search related to a candidate.
            </p>
          </div>
        )}

        {filtered && filtered.length > 0 && (
          <>
            {filtered[0].score < 0.3 && (
              <div className="bg-yellow-100 text-yellow-800 p-3 sm:p-4 rounded-lg text-xs sm:text-sm font-medium">
                No strong match found — showing closest candidate instead.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </>
        )}

        {filtered && filtered.length === 0 && (
          <div className="text-center text-muted-foreground mt-4 text-sm sm:text-base">
            No candidates matched your search.
          </div>
        )}
      </div>
    </div>
  );
}
