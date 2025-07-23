"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { useUserStore } from "@/store/userStore";
import { FilePlus, LibraryBig, Search, User } from "lucide-react";
import React, { useEffect } from "react";

export default function NavBar() {
  const links = [
    {
      title: "CV AI Search",
      icon: (
        <Search className="h-full w-full text-neutral-200 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Add New CV",
      icon: (
        <FilePlus className="h-full w-full text-neutral-200 dark:text-neutral-300" />
      ),
      href: "/dashboard/addcv",
    },

    {
      title: "Profile",
      icon: (
        <User className="h-full w-full text-neutral-200 dark:text-neutral-300" />
      ),
      href: "/dashboard/profile",
    },
    {
      title: "CV Library",
      icon: (
        <LibraryBig className="h-full w-full text-neutral-200 dark:text-neutral-300" />
      ),
      href: "/dashboard/cvlibrary",
    },
  ];
  return (
    <>
      <div className=" fixed flex w-full items-center justify-center bottom-14 border-red-400">
        <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        />
      </div>
    </>
  );
}
