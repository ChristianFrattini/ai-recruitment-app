import { deleteCandidate } from "@/actions/actions";
import SubmitButton from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchCandidate } from "@/lib/fetchData";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function DeleteCandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //console.log("ID", id);

  return (
    <div className={"h-[80vh] w-full flex items-center justify-center"}>
      <Card className={"max-w-xl items-center justify-center flex flex-col"}>
        <CardHeader>
          <CardTitle className={"flex flex-col text-2xl "}>
            Are you sure?
          </CardTitle>
          <CardDescription className={"text-md"}>
            This action cannot be undone. This action will permanently delete
            this item and all its data from the database!
          </CardDescription>
        </CardHeader>
        <CardFooter className={"w-full flex justify-between"}>
          <Button variant={"secondary"} asChild className={"group"}>
            <Link href={`/dashboard/cvlibrary/`}>
              <ChevronLeft
                className={
                  "h-4 w-4 mr-1 group-hover:-translate-x-1 duration-150"
                }
              />{" "}
              Return
            </Link>
          </Button>

          <form action={deleteCandidate}>
            <input type={"hidden"} name={"candidateId"} value={id} />
            <SubmitButton
              loadingText={"DELETING"}
              text={"DELETE"}
              variant={"destructive"}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
