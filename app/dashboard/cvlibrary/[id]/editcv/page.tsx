import EditCandidateForm from "@/app/components/dashboard-components/EditCandidateForm";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchCandidate } from "@/lib/fetchData";
import React from "react";

export default async function EditCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //console.log("ID", id);
  const candidate = await fetchCandidate(id);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <EditCandidateForm candidate={candidate} />
    </div>
  );
}
