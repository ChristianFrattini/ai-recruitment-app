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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import React, { useMemo, useState } from "react";

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
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [salaryFilter, setSalaryFilter] = useState<string | null>(null);
  const [experienceFilter, setExperienceFilter] = useState<string | null>(null);

  // Filtering logic
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const statusMatch =
        statusFilter === "all" || !statusFilter || c.status === statusFilter;
      const salaryMatch =
        salaryFilter === "all" ||
        !salaryFilter ||
        c.salaryExpectation === salaryFilter;
      const expMatch =
        experienceFilter === "all" ||
        !experienceFilter ||
        c.level === experienceFilter;
      return statusMatch && salaryMatch && expMatch;
    });
  }, [candidates, statusFilter, salaryFilter, experienceFilter]);
  return (
    <>
      {/*Candidate filtering */}
      <div className={"mb-5"}>
        <div
          className={
            "flex md:flex-row flex-col items-center justify-evenly gap-2"
          }
        >
          {/* Status Filtering */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold md:text-xl">Status</Label>
            <Select
              onValueChange={(v) => setStatusFilter(v || null)}
              value={statusFilter ?? ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All</SelectItem> {/* Reset option */}
                <SelectItem value="actively_seeking">
                  Actively Seeking
                </SelectItem>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="not_looking">Not Looking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Salary Filtering */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold md:text-xl">Salary</Label>
            <Select
              onValueChange={(v) => setSalaryFilter(v || null)}
              value={salaryFilter ?? ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Salary Exp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem> {/* Reset option */}
                <SelectItem value="£25000-£30000">£25000-£30000</SelectItem>
                <SelectItem value="£30000-£35000">£30000-£35000</SelectItem>
                <SelectItem value="£35000-£40000">£35000-£40000</SelectItem>
                <SelectItem value="£40000-£60000">£40000-£60000</SelectItem>
                <SelectItem value="£60000-£100000">£60000-£100000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Experience Filtering */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold md:text-xl">Experience</Label>
            <Select
              onValueChange={(v) => setExperienceFilter(v || null)}
              value={experienceFilter ?? ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem> {/* Reset option */}
                <SelectItem value="entry">Entry Level | Graduate</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table className="w-full border border-muted rounded-2xl shadow-sm">
        <TableCaption className="text-muted-foreground text-sm py-4">
          Explore candidates saved by your organization
        </TableCaption>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="text-sm  font-semibold text-muted-foreground">
              Name
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
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <TableRow
                className="hover:bg-muted/10 transition"
                key={candidate.id}
              >
                <TableCell className="font-medium text-foreground">
                  {candidate.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1  text-sm text-muted-foreground">
                    <span>Email:{candidate.email}</span>
                    <span>Phone: {candidate.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center  px-2 py-1 rounded-full text-xs font-medium ${
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
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-muted-foreground"
              >
                No candidates match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
