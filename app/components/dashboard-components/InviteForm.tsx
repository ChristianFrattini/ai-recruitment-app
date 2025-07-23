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

import { Loader2 } from "lucide-react";

export default function InviteForm({ orgId }: { orgId: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      //setMessage(`Invite sent! Link: ${data.inviteLink}`);
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
      <CardFooter>
        <p>{message}</p>
      </CardFooter>
    </Card>
  );
}
