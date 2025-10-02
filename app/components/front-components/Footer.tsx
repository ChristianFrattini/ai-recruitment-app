import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const links = [
  {
    name: "About",
    link: "/",
  },
  {
    name: "Contact Us",
    link: "/",
  },
  {
    name: "Privacy Policy",
    link: "/",
  },
];

export default function Footer() {
  return (
    <footer>
      <div
        className={
          " flex md:justify-between md:items-center flex-col md:flex-row h-full bg-gradient-to-tl from-gbStart to-gbEnd py-[11vh] px-[10vw]"
        }
      >
        {/*LOGO */}
        <div className={" space-y-3 "}>
          <div className="inline-block border border-gray-100 rounded-2xl px-4 py-1">
            <h2 className="md:text-3xl text-2xl uppercase tracking-tight">
              <span className="font-extrabold text-gray-100">AHIRE</span>
              <span className="font-light text-gray-400">HUB</span>
            </h2>
          </div>
          <Separator className={"bg-slate-400"} />
          <p className={"text-gray-400"}>
            Empowering recruitement with AI-drivent solutions for smarter
            hiring.
          </p>
          <p className={"text-gray-400"}>
            &copy; {new Date().getFullYear()} AhireHub. All rights reserved.
          </p>
        </div>

        {/*Links */}
        <div className={""}>
          <h3 className="md:text-2xl text-xl mt-7 font-semibold tracking-tight text-gray-100">
            About
          </h3>
          <Separator className={"bg-slate-400"} />
          <div className={"flex flex-col space-y-2 mt-3"}>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                className={"text-gray-400 hover:text-gray-200 duration-200"}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
