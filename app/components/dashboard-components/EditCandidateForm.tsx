"use client";

import { editCandidate } from "@/actions/actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { editCandidateSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { $Enums } from "@prisma/client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";
import SubmitButton from "../SubmitButton";

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

export default function EditCandidateForm({ candidate }: CandidateType) {
  const [lastResult, action] = useActionState(editCandidate, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editCandidateSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form
      className="max-w-5xl mx-auto mt-10 px-4 mb-[11vh] "
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
    >
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
            <div className={"flex flex-col gap-2"}>
              <Label className={"text-lg"}>Candidate Name</Label>
              <Input
                placeholder={"John Doe"}
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={candidate.name}
              />
              <p>{fields.name.errors}</p>
            </div>
            <div className={"flex flex-col gap-2"}>
              <Label className={"text-lg"}>Candidate Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={candidate.status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent position={"popper"}>
                  <SelectItem value="actively_seeking">
                    Actively Seeking
                  </SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="not_looking">Not Looking</SelectItem>
                </SelectContent>
              </Select>
              <p>{fields.status.errors}</p>
            </div>
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            <div className={"flex flex-col gap-2"}>
              <Label className={"text-lg"}>Candidate Name</Label>
              <Input
                placeholder={"John Doe"}
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={candidate.email}
              />
            </div>{" "}
            <p>{fields.email.errors}</p>{" "}
            <div className={"flex flex-col gap-2 mt-2"}>
              <Label className={"text-lg"}>Candidate Name</Label>
              <Input
                placeholder={"John Doe"}
                key={fields.phone.key}
                name={fields.phone.name}
                defaultValue={candidate.phone}
              />
            </div>
            <p>{fields.phone.errors}</p>
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 mt-6">
          <input type="hidden" name="id" value={candidate.id} />

          <input type="hidden" name="cvText" value={candidate.cvText} />

          <div>
            <h3 className="font-semibold text-base mb-1">Level & Salary</h3>
            <div className={"flex flex-col gap-2"}>
              <Label className={"text-lg"}>Candidate Level</Label>
              <Select
                key={fields.level.key}
                name={fields.level.name}
                defaultValue={candidate.level}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level | Graduate</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
              <p>{fields.level.errors}</p>
            </div>

            <div className={"flex flex-col gap-2"}>
              <Label className={"text-lg"}>Salary Expectation</Label>
              <Select
                key={fields.salaryExpectation.key}
                name={fields.salaryExpectation.name}
                defaultValue={candidate.salaryExpectation}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Salary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="£25000-£30000">£25000-£30000</SelectItem>
                  <SelectItem value="£30000-£35000">£30000-£35000</SelectItem>
                  <SelectItem value="£35000-£40000">£35000-£40000</SelectItem>
                  <SelectItem value="£40000-£60000">£40000-£60000</SelectItem>
                  <SelectItem value="£60000-£100000">£60000-£100000</SelectItem>
                </SelectContent>
              </Select>

              <p>{fields.salaryExpectation.errors}</p>
            </div>
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
        <CardFooter>
          <SubmitButton text={"Save"} loadingText={"Saving"} />
        </CardFooter>
      </Card>
    </form>
  );
}
