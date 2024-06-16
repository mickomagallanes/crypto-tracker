"use client";

import { Bitcoin, BriefcaseBusiness, Newspaper } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import useToggle from "./hooks/useToggle";
import Searchbar from "./generic/searchbar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  cName?: string;
}

export default function Navbar() {
  const [isSearchOpen, searchToggle] = useToggle();
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(val: string) {
    router.push(`${pathname}?search=${val}`);
  }

  return (
    <nav
      className="absolute z-50 justify-between bg-[#1B0404]
    sm:fixed sm:flex sm:w-full sm:flex-row sm:items-center sm:px-5 sm:pb-2 sm:pt-3"
    >
      <ul
        id="nav-menu"
        className="fixed bottom-0 flex w-full border-t border-gray-200/65 bg-[#1B0404] pt-2 text-center text-xs sm:relative 
        sm:top-0 sm:flex sm:w-auto sm:flex-row sm:space-x-4 sm:border-none sm:text-lg"
      >
        <NavItem
          href="/"
          icon={<Bitcoin />}
          label="Crypto"
          cName={cn(pathname === "/" ? "text-pink-400" : "")}
        />
        <NavItem
          href="/portfolio"
          icon={<BriefcaseBusiness />}
          label="Portfolio"
          cName={cn(
            pathname === "/portfolio" ? "text-purple-400" : "",
            "hover:text-purple-400",
          )}
        />
        <NavItem
          href="/news"
          icon={<Newspaper />}
          label="News"
          cName={cn(
            pathname === "/news" ? "text-blue-400" : "",
            "hover:text-blue-400",
          )}
        />
      </ul>

      <div
        className="fixed top-0 flex w-full cursor-pointer flex-row bg-[#1B0404]
      px-2 pt-2 align-middle sm:relative sm:right-0 sm:w-auto sm:justify-end sm:p-0"
      >
        <Searchbar
          cName="justify-end"
          isSearchOpen={isSearchOpen}
          searchToggle={searchToggle}
          onSearch={handleSearch}
        />
      </div>
    </nav>
  );
}

function NavItem({ href, label, icon, cName = "" }: NavItemProps): ReactNode {
  return (
    <Link href={href} className="flex-1">
      <li>
        <i className={cn("flex items-center justify-center sm:hidden", cName)}>
          {icon}
        </i>
        <p className={cName}>{label}</p>
      </li>
    </Link>
  );
}
