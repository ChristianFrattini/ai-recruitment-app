"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronRight } from "lucide-react";
import React, { useActionState } from "react";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { orgSchema } from "@/lib/zodSchemas";
import { editOrg } from "@/actions/actions";
import SubmitButton from "../SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  title: string;
  specialization: string;
  isAdmin: boolean;
  organizationId: string;
  createdAt: Date;
}

interface OrgProps {
  id: string;
  isUpdated: boolean;
  name: string;
  users: User[];
}

export default function OrganizationForm({ org }: { org: OrgProps }) {
  const [lastResult, action] = useActionState(editOrg, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: orgSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className={"mt-5"}
    >
      <input type="hidden" name="orgId" value={org.id} />

      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold tracking-tight">
          Edit Organization
        </h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Edit {org.name}</CardTitle>
          <CardDescription>
            Update your organization details and save the changes.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl font-semibold bg-gray-200 text-gray-700">
                  {org.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {org.name}
                </h2>
                <p className="text-sm text-gray-500">Organization</p>
              </div>
            </div>

            {/* Organization ID */}
            <div className="flex flex-col gap-3">
              <Label>Organization ID</Label>
              <Input
                key={fields.id.key}
                name={fields.id.name}
                defaultValue={org.id}
                className="bg-gray-100"
                readOnly
              />
              <p className="text-red-500 text-muted-foreground">
                {fields.id.errors}
              </p>
            </div>

            {/* Organization Name */}
            <div className="flex flex-col gap-3">
              <Label>Organization Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={org.name}
                placeholder="Enter organization name"
              />
              <p className="text-red-500 text-muted-foreground">
                {fields.name.errors}
              </p>
            </div>

            {/* User Limit */}
            <div className="flex flex-col gap-3">
              <Label>User Limit</Label>
              <Input value="3" type="number" disabled className="bg-gray-100" />
            </div>

            {/* Subscription Plan */}
            <div className="flex flex-col gap-3">
              <Label>Subscription Plan</Label>
              <Input
                value="Premium"
                disabled
                className="bg-gray-100 hover:cursor-not-allowed"
              />
              <Button className="flex group" variant="outline" type="button">
                Change your Plan
                <ChevronRight className="mr-2 h-5 w-5 group-hover:translate-x-1 duration-150" />
              </Button>
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
