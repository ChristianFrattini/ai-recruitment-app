"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function InvitePageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    Cookies.set("inviteToken", token);
    router.push("/api/auth/login?post_login_redirect_url=/api/post-auth");
  }, [token]);

  return (
    <p className={"w-full h-full justify-center items-center"}>
      Redirecting to login...
    </p>
  );
}
