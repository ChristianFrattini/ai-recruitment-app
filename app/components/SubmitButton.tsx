"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  text: string;
  loadingText: string;
  loading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export default function SubmitButton({
  text,
  loadingText,
  variant,
  loading,
}: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className={"mr-2 h-4 w-4 animate-spin"} /> {loadingText}
          ...{" "}
        </Button>
      ) : (
        <Button
          variant={variant}
          type={"submit"}
          onClick={() => console.log("Submit button clicked")}
        >
          {text}
        </Button>
      )}
    </>
  );
}
