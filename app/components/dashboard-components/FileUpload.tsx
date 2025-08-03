import React from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadCo() {
  return (
    <div className="w-full mt-10 max-w-4xl mx-auto  border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg relative z-10 overflow-visible">
      <FileUpload />
    </div>
  );
}
