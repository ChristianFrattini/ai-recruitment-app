import { $Enums } from "@prisma/client";

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
}[];
