import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { $Enums, CandidateLevel, CandidateStatus } from "@prisma/client";
import { motion } from "framer-motion";

import React from "react";

interface CandidateCardProps {
  candidate: {
    id: string;
    email: string;
    createdAt: Date;
    name: string;
    status: $Enums.CandidateStatus;
    phone: string;
    level: $Enums.CandidateLevel;
    salaryExpectation: string;
    cvUrl: string;
    cvSummary: string;
    score: number;
    cvText: string;
    uploadedById: string;
    embedding: number[];
  };
}

const statusLabels: Record<CandidateStatus, string> = {
  actively_seeking: "Actively Seeking",
  employed: "Employed",
  not_looking: "Not Looking",
};

const experienceLabels: Record<CandidateLevel, string> = {
  entry: "Entry Level",
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
};

const statusStyles: Record<string, string> = {
  actively_seeking: "bg-green-100 text-green-800",
  employed: "bg-red-100 text-red-800",
  not_looking: "bg-gray-100 text-gray-800",
};

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <motion.div
      className="m-3 sm:m-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250 }}
      >
        <Card className="flex flex-col h-full w-full sm:w-72 md:w-80 lg:w-96 shadow-lg rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-shadow">
          {/* HEADER */}
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold leading-snug">
                  {candidate.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                  {candidate.email} · {candidate.phone}
                </CardDescription>
              </div>
              <div className="text-right space-y-1 shrink-0">
                <Badge
                  variant="outline"
                  className="px-2 py-0.5 text-[10px] sm:text-xs"
                >
                  {experienceLabels[candidate.level]}
                </Badge>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  Match:{" "}
                  <span className="font-medium">
                    {(candidate.score * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="flex-1 space-y-4">
            <div className="text-xs sm:text-sm">
              <p className="font-medium mb-1 text-muted-foreground">
                CV Summary:
              </p>
              <p className="whitespace-pre-line ">{candidate.cvSummary}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-3 border-t text-xs sm:text-sm text-muted-foreground">
              <p>
                Status:{" "}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                    statusStyles[candidate.status] ??
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusLabels[candidate.status]}
                </span>
              </p>
              <p>
                Salary:{" "}
                <span className="font-medium">
                  {candidate.salaryExpectation}
                </span>
              </p>
            </div>
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="flex justify-end pt-3 sm:pt-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-xl w-full sm:w-auto">View CV</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-screen">
                <SheetHeader>
                  <SheetTitle>Candidate CV</SheetTitle>
                  <SheetDescription>
                    {candidate.name}&apos;s full CV
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="mt-4 h-[80vh] w-full rounded-md border p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {candidate.cvText}
                  </pre>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
