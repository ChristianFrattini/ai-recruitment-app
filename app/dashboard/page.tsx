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

import { fetchCandidates } from "@/lib/fetchData";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!dbUser) return redirect("/");

  const candidates = await fetchCandidates(true);
  return (
    <div className={"md:mt-5 md:ml-5 mt-2 ml-5"}>
      <div className={"flex justify-between items-center"}>
        <div>
          <h2 className="font-normal  md:text-xl text-lg text-gray-700">
            Welcome back,{" "}
            <span className="md:text-2xl text-xl font-medium text-gray-900">
              {dbUser.firstName}
            </span>
          </h2>
        </div>
      </div>
      <ClientUserProvider dbUser={dbUser} />
      <Search candidates={candidates} />
    </div>
  );
}
