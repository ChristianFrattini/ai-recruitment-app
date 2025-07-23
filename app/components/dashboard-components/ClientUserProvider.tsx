// components/ClientUserProvider.tsx
"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { UserType } from "@/types/user.types";

export default function ClientUserProvider({ dbUser }: { dbUser: UserType }) {
  const zustandUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Only set if Zustand is empty or user.id doesn't match
    if (!zustandUser || zustandUser.id !== dbUser.id) {
      setUser(dbUser);
      console.log("✅ Zustand user set in ClientUserProvider");
      //alert("user set");
    }
  }, [dbUser, zustandUser, setUser]);

  return null;
}
