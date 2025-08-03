"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InviteError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
      {error === "expired" && (
        <p>This invite link has expired or is invalid.</p>
      )}
      {error === "email-mismatch" && (
        <p>This invite was not intended for your email address.</p>
      )}
      {!error && (
        <p>
          We couldn&apos;t process your invite. Please try again or contact
          support.
        </p>
      )}
      <Button asChild className="mt-5">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
