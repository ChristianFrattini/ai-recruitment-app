import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchCandidate } from "@/lib/fetchData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function ViewCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = await fetchCandidate(id);

  const statusLabel = {
    actively_seeking: "Actively Seeking",
    employed: "Employed",
    not_looking: "Not Looking",
  }[candidate.status];

  const levelLabel = {
    entry: "Entry Level",
    junior: "Junior",
    mid: "Mid",
    senior: "Senior",
  }[candidate.level];
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 mb-[11vh] ">
      <Button asChild className={"mb-2 group "} variant={"outline"}>
        <Link href={"/dashboard/cvlibrary/"}>
          <ArrowLeft
            className={"h-6 w-6 group-hover:-translate-x-1 duration-150"}
          />
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex justify-between items-center">
            {candidate.name}
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 ${
                candidate.status === "actively_seeking"
                  ? "bg-green-100 text-green-800"
                  : candidate.status === "employed"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {statusLabel}
            </Badge>
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            {candidate.email} • {candidate.phone}
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 mt-6">
          <div>
            <h3 className="font-semibold text-base mb-1">Level & Salary</h3>
            <p>
              <span className="font-medium">Level:</span> {levelLabel}
              <br />
              <span className="font-medium">Salary Expectation:</span>{" "}
              {candidate.salaryExpectation}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">CV Summary</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line ">
              {candidate.cvSummary}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">Full CV</h3>
            <div className="max-h-[400px] overflow-y-auto bg-gray-50 border rounded-md p-4 text-sm  whitespace-pre-wrap font-serif tracking-wide ">
              {candidate.cvText}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
