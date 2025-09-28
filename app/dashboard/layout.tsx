import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import NavBar from "../components/dashboard-components/NavBar";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!dbUser) return redirect("/");

  return (
    <div>
      <div className={"w-full fixed top-0 "}>
        <div className={"flex justify-between items-center p-5"}>
          <div className="inline-block border border-blue-900 rounded-2xl px-4 py-1">
            <h2 className="md:text-3xl text-2xl uppercase tracking-tight">
              <span className="font-extrabold text-blue-900">AHIRE</span>
              <span className="font-light text-blue-500">HUB</span>
            </h2>
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
      </div>
      <div className={"mt-[10vh]"}>{children}</div>

      <NavBar />
    </div>
  );
}
