"use client";

import { AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
//import { candidateType } from "@/types/candidate.types";
import { CandidateLevel, CandidateStatus, Prisma } from "@prisma/client";
import { Avatar } from "@radix-ui/react-avatar";
import { CircleEllipsis } from "lucide-react";
import Link from "next/link";
import React from "react";

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

export type candidateType = Prisma.CandidateGetPayload<{
  include: { uploadedBy: true };
}>[];

export default function CVTable({ candidates }: { candidates: candidateType }) {
  return (
    <>
      <Table className="w-full border border-muted rounded-2xl shadow-sm">
        <TableCaption className="text-muted-foreground text-sm py-4">
          Explore candidates saved by your organization
        </TableCaption>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="text-sm font-semibold text-muted-foreground">
              Name & LastName
            </TableHead>
            <TableHead className="text-sm font-semibold text-muted-foreground">
              Contacts
            </TableHead>
            <TableHead className="text-sm font-semibold text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="text-sm font-semibold text-muted-foreground">
              Experience Level
            </TableHead>
            <TableHead className="text-sm font-semibold text-muted-foreground">
              Salary Exp.
            </TableHead>
            <TableHead className="text-sm font-semibold text-muted-foreground">
              Saved By
            </TableHead>
            <TableHead className="text-sm font-semibold text-muted-foreground text-center">
              Options
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow
              className="hover:bg-muted/10 transition"
              key={candidate.id}
            >
              <TableCell className="font-medium text-foreground">
                {candidate.name}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <span>Email:{candidate.email}</span>
                  <span>Phone: {candidate.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    statusStyles[candidate.status] ??
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusLabels[candidate.status]}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-foreground">
                  {experienceLabels[candidate.level]}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-foreground">
                  {candidate.salaryExpectation}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {`${candidate.uploadedBy.firstName?.[0] ?? ""}${candidate.uploadedBy.lastName?.[0] ?? ""}`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-foreground">
                    {candidate.uploadedBy.firstName}{" "}
                    {candidate.uploadedBy.lastName}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:opacity-75 transition">
                    <CircleEllipsis className="w-5 h-5 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/cvlibrary/${candidate.id}`}>
                        View Candidate Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/cvlibrary/${candidate.id}/editcv`}
                      >
                        Modify details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Link
                        href={`/dashboard/cvlibrary/${candidate.id}/delete`}
                      >
                        Delete
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
