import { $Enums } from "@prisma/client";
import React from "react";

export type candidateType = {
  id: string;
  email: string;
  createdAt: Date;
  name: string;
  status: $Enums.CandidateStatus;
  phone: string;
  level: $Enums.CandidateLevel;
  salaryExpectation: string;
  cvUrl: string;
  cvText: string;
  cvSummary: string;
  uploadedById: string;
  embedding: number[];
};

type CandidateType = {
  candidate: candidateType;
};

export default function DeleteCandidateCard({ candidate }: CandidateType) {
  return <div></div>;
}
