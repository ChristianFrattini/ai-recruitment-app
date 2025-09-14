"use client";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { House } from "lucide-react";

import React, { useState } from "react";

export default function NavBar({
  authenticated,
}: {
  authenticated: boolean | null;
}) {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar className={""}>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {authenticated ? (
              <NavbarButton
                variant="secondary"
                className={
                  "text-gray-200 flex items-center justify-center gap-1"
                }
                href={"/dashboard"}
              >
                <House className={"h-5 w-5"} /> Dashboard
              </NavbarButton>
            ) : (
              <NavbarButton
                variant="secondary"
                className={"text-gray-200"}
                as={"div"} // this is a workaround to use the Kinde LoginLink with NavbarButton
              >
                <LoginLink>Login</LoginLink>
              </NavbarButton>
            )}

            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton as="div" className="w-full">
                <LoginLink
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-full flex items-center justify-center"
                >
                  Login
                </LoginLink>
              </NavbarButton>
              {/* <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton> */}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
}
