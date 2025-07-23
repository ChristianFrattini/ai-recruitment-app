import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
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
      className="m-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="shadow-lg rounded-2xl border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-semibold">
                  {candidate.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {candidate.email} · {candidate.phone}
                </CardDescription>
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline">
                  {experienceLabels[candidate.level]}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Match:{" "}
                  <span className="font-medium">
                    {(candidate.score * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium mb-1 text-muted-foreground">
                CV Summary:
              </p>
              <p className="whitespace-pre-line">{candidate.cvSummary}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t mt-4 text-sm text-muted-foreground">
              <p>
                Status:{" "}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    statusStyles[candidate.status] ??
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusLabels[candidate.status]}
                </span>
              </p>
              <p>
                Expected Salary:{" "}
                <span className="font-medium">
                  {candidate.salaryExpectation}
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter className={"flex items-center justify-end"}>
            <Sheet>
              <SheetTrigger asChild>
                <Button>View CV</Button>
              </SheetTrigger>
              <SheetContent side={"bottom"}>
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
