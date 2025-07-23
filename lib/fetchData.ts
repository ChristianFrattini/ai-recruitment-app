import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./db";
import { redirect } from "next/navigation";

export async function fetchOrganization() {
  const user = await fetchUser();

  const data = await prisma.organization.findUnique({
    where: {
      id: user.organizationId,
    },
    include: {
      users: true,
    },
  });
  return data;
}

export async function fetchUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { candidates: true },
  });

  if (!dbUser) return redirect("/");
  return dbUser;
}

export async function fetchCandidates(onlyActive: boolean = false) {
  const user = await fetchUser();
  const candidates = await prisma.candidate.findMany({
    where: {
      uploadedBy: {
        organizationId: user.organizationId,
      },
      ...(onlyActive && {
        status: "actively_seeking",
      }),
    },
    include: {
      uploadedBy: true,
    },
  });
  return candidates;
}
