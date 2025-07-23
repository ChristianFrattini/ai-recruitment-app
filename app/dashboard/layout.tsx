import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NavBar from "../components/dashboard-components/NavBar";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ClientUserProvider from "../components/dashboard-components/ClientUserProvider";

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
      {children}

      <NavBar />
    </div>
  );
}
