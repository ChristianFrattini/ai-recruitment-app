import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) throw new Error("Not authenticated");

  const cookieStore = await cookies();
  const token = cookieStore.get("inviteToken")?.value;

  // Handle invite if present
  if (token) {
    const invite = await prisma.invite.findUnique({ where: { token } });

    const redirectTo = (path: string, msg?: string) => {
      const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL);
      if (msg) url.searchParams.set("error", msg);
      return NextResponse.redirect(url);
    };

    if (!invite || invite.used || invite.expiresAt < new Date()) {
      console.warn("Invalid or expired invite:", invite?.token);
      return redirectTo("/invalid-invite", "expired");
    }

    if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
      console.warn("Invite email mismatch:", invite.email, user.email);
      return redirectTo("/invalid-invite", "email-mismatch");
    }

    // Create user if doesn't exist only if the invite is valid
    let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          profileImage: user.picture ?? "",
          specialization: "Frontend Engineering",
          title: "Senior Recruiter",
        },
      });
    }

    await prisma.user.update({
      where: { id: dbUser.id },
      data: { organizationId: invite.orgId },
    });

    await prisma.invite.update({
      where: { token },
      data: { used: true },
    });

    cookieStore.delete("inviteToken");
  }

  return NextResponse.redirect(
    new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL),
  );
}
