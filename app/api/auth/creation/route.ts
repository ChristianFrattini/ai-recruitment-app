import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    //checks uf there is already an existing user in the DB
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    const org = await prisma.organization.create({
      data: {
        name: user.email ? user.email.split("@")[1] : "Default Org",
      },
    });

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        title: "Senior Recruiter",
        specialization: "Frontend Engineering",
        isAdmin: true,
        organizationId: org.id,
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/rauchg${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/dashboard"
      : "https://ai-recruitment-app.vercel.app/dashboard",
  );
}
