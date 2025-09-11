import CVTable from "@/app/components/dashboard-components/CVTable";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { fetchCandidates } from "@/lib/fetchData";
import React from "react";

const words = "CV Library";

export default async function CVLibraryPage() {
  const candidates = await fetchCandidates();
  return (
    <div className={"flex flex-col mt-10 items-center justify-center w-full"}>
      <TextGenerateEffect
        words={words}
        className={"!text-3xl !text-black text-gr"}
        textSize={"text-2xl"}
        textcolour={"text-gray-700"}
      />
      <div className={"mt-5  w-full px-2 md:px-10"}>
        <CVTable candidates={candidates} />
      </div>
    </div>
  );
}
