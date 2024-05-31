"use client";

import { Bitcoin, BriefcaseBusiness, Newspaper } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import useToggle from "./hooks/useToggle";
import Searchbar from "./generic/searchbar";
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
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
      className="z-50 justify-between sm:fixed
    sm:mt-3 sm:flex sm:w-full sm:flex-row sm:items-center sm:px-5"
    >
      <ul
        id="nav-menu"
        className="fixed bottom-0 grid w-full grid-cols-3 border-t border-gray-200/65 pt-2 text-center text-lg sm:relative
        sm:top-0 sm:flex sm:w-auto sm:flex-row sm:space-x-4 sm:border-none "
      >
        <NavItem href="/" icon={<Bitcoin />} label="Crypto" />
        <NavItem
          href="/portfolio"
          icon={<BriefcaseBusiness />}
          label="Portfolio"
        />
        <NavItem href="/news" icon={<Newspaper />} label="News" />
      </ul>

      <div
        className="fixed top-0 mt-2 flex w-full cursor-pointer flex-row
      px-2 align-middle sm:relative sm:right-0 sm:w-auto sm:justify-end sm:p-0"
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

function NavItem({ href, label, icon }: NavItemProps): ReactNode {
  return (
    <li>
      <i className="flex items-center justify-center sm:hidden">{icon}</i>
      <Link href={href}>{label}</Link>
    </li>
  );
}
