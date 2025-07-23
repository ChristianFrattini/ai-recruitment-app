"use client";

import { editProfile } from "@/actions/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import React, { useActionState } from "react";
import SubmitButton from "../SubmitButton";

export default function ProfileForm({
  id,
  name,
  lastName,
  email,
  title,
  specialization,
}: {
  id: string;
  name: string;
  lastName: string;
  email: string;
  title: string;
  specialization: string;
}) {
  const [lastResult, action] = useActionState(editProfile, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: profileSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  console.log("details ", title);
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-start gap-6 flex-col md:flex-row">
        {/* Avatar Section */}
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-xl font-semibold bg-gray-200 text-gray-700">
            {`${name?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Info + Inputs Section */}
        <div className="flex-1 flex flex-col gap-4 ">
          {/* Name + Email */}
          <div className={""}>
            <h2 className="text-base font-semibold text-gray-900">
              {name} {lastName}
            </h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <input
            hidden={true}
            key={fields.profileId.key}
            name="profileId"
            defaultValue={id}
            placeholder="Enter organization name"
            readOnly
          />

          {/* Input Fields in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-gray-700">Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={title}
                placeholder="Enter organization name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm text-gray-700">Specialised in</Label>
              <Input
                key={fields.specialization.key}
                name={fields.specialization.name}
                defaultValue={specialization}
                placeholder="Enter organization name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm text-gray-700">
                Total CVs uploaded
              </Label>
              <Label>3</Label>
            </div>
          </div>
          <div className={"flex justify-end items-end mt-12"}>
            <SubmitButton text={"Save"} loadingText={"Saving"} />
          </div>
        </div>
      </div>
    </form>
  );
}
