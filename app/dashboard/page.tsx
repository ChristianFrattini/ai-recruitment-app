import { Button } from "@/components/ui/button";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import Search from "../components/dashboard-components/Search";
import prisma from "@/lib/db";
import ClientUserProvider from "../components/dashboard-components/ClientUserProvider";
import InviteForm from "../components/dashboard-components/InviteForm";
import { fetchCandidates } from "@/lib/fetchData";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!dbUser) return redirect("/");

  const candidates = await fetchCandidates(true);
  return (
    <div className={"h-full m-10"}>
      <div className={"flex justify-between items-center"}>
        <div>
          <h2 className={"font-semibold md:text-2xl text-xl"}>Welcome back</h2>
        </div>
        <div>
          <Button asChild className={"flex items-center justify-center"}>
            <LogoutLink>
              <LogOut className={"h-5 w-5"} />
              <span className={"hidden md:inline"}>Logout</span>
            </LogoutLink>
          </Button>
        </div>
      </div>
      <ClientUserProvider dbUser={dbUser} />
      <Search candidates={candidates} />
    </div>
  );
}
