import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddCVForm() {
  return (
    <div className={"grid gap-12 grid-cols-3 mt-10"}>
      <div className={"flex flex-col gap-2"}>
        <Label className={"text-lg"}>Candidate Name</Label>
        <Input placeholder={"John Doe"} />
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label className={"text-lg"}>Phone Number</Label>
        <Input placeholder={"0712378945"} type={"tel"} />
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label className={"text-lg"}>Email</Label>
        <Input placeholder={"johndoe@email.com"} type={"email"} />
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label className={"text-lg"}>Status</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent position={"popper"}>
            <SelectItem value="light">Actively Seeking</SelectItem>
            <SelectItem value="dark">Employed</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={"flex flex-col gap-2"}>
        <Label className={"text-lg"}>Candidate Level</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Entry Level | Graduate</SelectItem>
            <SelectItem value="dark">Junior</SelectItem>
            <SelectItem value="system">Mid</SelectItem>
            <SelectItem value="system">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={"flex flex-col gap-2"}>
        <Label className={"text-lg"}>Salary Expectation</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Actively Seeking</SelectItem>
            <SelectItem value="dark">Employed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
