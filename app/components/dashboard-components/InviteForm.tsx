"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";

import { Clipboard, Loader2 } from "lucide-react";

export default function InviteForm({ orgId }: { orgId: string }) {
  const [email, setEmail] = useState("");
  const [emailText, setEmailText] = useState("");
  const [message, setMessage] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sendInvite = async (e: any) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    const res = await fetch("/api/invite", {
      method: "POST",
      body: JSON.stringify({ email, orgId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      setEmailText(email);
      setInviteLink(` ${data.inviteLink}`);
      setMessage(`Invite sent to ${email}!`);
      setEmail("");
    } else {
      setMessage("Failed to send invite");
    }

    setLoading(false);
  };

  return (
    <Card className={"w-full h-full border-none shadow-none"}>
      <CardHeader>
        <CardTitle>Invite a new member</CardTitle>
        <CardDescription>
          Enter the email address of the person you want to invite to your
          organization. A unique invite link will be sent to the email address
          provided.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className={"flex flex-col items-center justify-center gap-2"}
          onSubmit={sendInvite}
        >
          <input
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 rounded-lg w-[50%]"
          />
          <Button disabled={loading} type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? `Sending Invite...` : "Invite"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className={"flex flex-col gap-3"}>
        <p>{message}</p>
        <div className={"flex items-center gap-3"}>
          {inviteLink && (
            <div className={"flex items-center justify-between gap-2"}>
              <p className={"md:text-lg text-base font-medium"}>
                Please, copy and paste this link and send it to{" "}
                <a
                  href={`mailto:${emailText}`}
                  className={"text-blue-600 underline"}
                >
                  {emailText}
                </a>
                :{inviteLink}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                }}
              >
                {copied ? "Copied!" : <Clipboard className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
