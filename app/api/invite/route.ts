import { randomUUID } from "crypto";
import { addDays } from "date-fns";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { sendInviteEmail } from "@/lib/sendInviteEmail";

export async function POST(req: Request) {
  const { email, orgId } = await req.json();

  const token = randomUUID();

  await prisma.invite.create({
    data: {
      token,
      email,
      orgId,
      expiresAt: addDays(new Date(), 7),
    },
  });

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite?token=${token}`;
  await sendInviteEmail({ to: email, link: inviteLink });

  return NextResponse.json({ inviteLink });
}
