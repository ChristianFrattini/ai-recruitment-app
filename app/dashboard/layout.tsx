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
      <div className={"flex justify-between items-center p-5"}>
        <div>
          <h2 className={"font-semibold md:text-2xl text-xl"}>LOGO</h2>
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
      {children}

      <NavBar />
    </div>
  );
}
