"use client";
import { saveCandidate } from "@/actions/actions";
import SubmitButton from "@/app/components/SubmitButton";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { candidateSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { motion } from "framer-motion";

import React, { useRef, useState } from "react";
import { useActionState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const words = "Add a new CV to the Library";
export default function AddCVPage() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const fileToSet = newFiles.length > 0 ? [newFiles[0]] : [];
    setFiles(fileToSet);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const [lastResult, action] = useActionState(saveCandidate, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: candidateSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div
        className={
          "flex flex-col items-center justify-center mx-2 sm:mx-[8rem] md:mx-[20rem]"
        }
      >
        <TextGenerateEffect
          words={words}
          className={"!text-3xl !text-black text-gr"}
          textSize={"text-2xl"}
          textcolour={"text-gray-700"}
        />

        <div className="mt-7 flex ">
          <SubmitButton text={"Upload CV"} loadingText={"Uploading"} />
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 sm:mt-10 w-full">
          {/* Candidate Name */}
          <div className="flex flex-col gap-2">
            <Label className="text-base sm:text-lg">Candidate Name</Label>
            <Input
              placeholder="John Doe"
              key={fields.name.key}
              name={fields.name.name}
              defaultValue={fields.name.initialValue}
              className="w-full"
            />
            <p className="text-red-500 text-sm">{fields.name.errors}</p>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <Label className="text-base sm:text-lg">Phone Number</Label>
            <Input
              placeholder="0712378945"
              type="tel"
              key={fields.phone.key}
              name={fields.phone.name}
              defaultValue={fields.phone.initialValue}
              className="w-full"
            />
            <p className="text-red-500 text-sm">{fields.phone.errors}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label className="text-base sm:text-lg">Email</Label>
            <Input
              placeholder="johndoe@email.com"
              type="email"
              key={fields.email.key}
              name={fields.email.name}
              defaultValue={fields.email.initialValue}
              className="w-full"
            />
            <p className="text-red-500 text-sm">{fields.email.errors}</p>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <Label className="text-base sm:text-lg">Status</Label>
            <Select
              key={fields.status.key}
              name={fields.status.name}
              defaultValue={fields.status.initialValue}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actively_seeking">
                  Actively Seeking
                </SelectItem>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="not_looking">Not Looking</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-sm">{fields.status.errors}</p>
          </div>

          {/* Candidate Level */}
          <div className="flex flex-col gap-2">
            <Label className="text-base sm:text-lg">Candidate Level</Label>
            <Select
              key={fields.level.key}
              name={fields.level.name}
              defaultValue={fields.level.initialValue}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level | Graduate</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-sm">{fields.level.errors}</p>
          </div>

          {/* Salary Expectation */}
          <div className="flex flex-col gap-2">
            <Label className="text-base sm:text-lg">Salary Expectation</Label>
            <Select
              key={fields.salaryExpectation.key}
              name={fields.salaryExpectation.name}
              defaultValue={fields.salaryExpectation.initialValue}
            >
              <SelectTrigger className="w-full">
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
            <p className="text-red-500 text-sm">
              {fields.salaryExpectation.errors}
            </p>
          </div>
        </div>
        <div className="w-full mt-10 max-w-4xl mb-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          {/*<input
            type="file"
            name="file" // This name is important for FormData
            id="file"
            accept=".pdf"
            required
            className="hidden"
            ref={fileInputRef}
          />*/}
          <div className="w-full" {...getRootProps()}>
            <motion.div
              onClick={handleClick}
              whileHover="animate"
              className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden bg-blue-950"
            >
              <input
                ref={fileInputRef}
                id="file-upload-handle"
                type="file"
                name={"file"}
                accept={".pdf"}
                onChange={(e) =>
                  handleFileChange(Array.from(e.target.files || []))
                }
                className="hidden"
                multiple={false}
              />
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                <GridPattern />
              </div>

              <div className="flex flex-col items-center justify-center relative z-10">
                <p className="font-sans font-bold text-blue-100 text-base">
                  Upload file
                </p>
                <p className="font-sans font-normal text-blue-300 text-base mt-2">
                  Drag or drop your files here or click to upload
                </p>

                <div className="relative w-full mt-10 max-w-xl mx-auto">
                  {files.length > 0 &&
                    files.map((file, idx) => (
                      <motion.div
                        key={"file" + idx}
                        layoutId={
                          idx === 0 ? "file-upload" : "file-upload-" + idx
                        }
                        className="relative overflow-hidden z-40 bg-blue-900 border border-blue-800 text-blue-100 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
                      >
                        <div className="flex justify-between w-full items-center gap-4">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="text-base truncate max-w-xs"
                          >
                            {file.name}
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm bg-blue-800 text-blue-200 shadow-input"
                          >
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </motion.p>
                        </div>

                        <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-blue-300">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="px-1 py-0.5 rounded-md bg-blue-800"
                          >
                            {file.type}
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                          >
                            modified{" "}
                            {new Date(file.lastModified).toLocaleDateString()}
                          </motion.p>
                        </div>
                      </motion.div>
                    ))}

                  {!files.length && (
                    <motion.div
                      layoutId="file-upload"
                      variants={mainVariant}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="relative group-hover/file:shadow-2xl z-40 bg-blue-900 border border-blue-800 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,50,0.2)]"
                    >
                      {isDragActive ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-blue-200 flex flex-col items-center"
                        >
                          Drop it
                          <IconUpload className="h-4 w-4 text-blue-300" />
                        </motion.p>
                      ) : (
                        <IconUpload className="h-4 w-4 text-blue-300" />
                      )}
                    </motion.div>
                  )}

                  {!files.length && (
                    <motion.div
                      variants={secondaryVariant}
                      className="absolute opacity-0 border border-dashed border-blue-600 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                    ></motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          <p className={"text-red-500 text-sm"}>{fields.file.errors}</p>
        </div>
      </div>
    </form>
  );
}

function GridPattern() {
  const columns = 41;
  const rows = 11;

  return (
    <div className="flex bg-blue-950 dark:bg-blue-950 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-blue-900 dark:bg-blue-900"
                  : "bg-blue-900 dark:bg-blue-900 shadow-[0px_0px_1px_3px_rgba(30,58,138,0.6)_inset] dark:shadow-[0px_0px_1px_3px_rgba(20,30,80,0.8)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}
