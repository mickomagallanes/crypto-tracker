"use client";

import { Bitcoin, BriefcaseBusiness, Newspaper } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import useToggle from "./hooks/useToggle";
import Searchbar from "./searchbar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const params = useParams<{ [key: string]: string }>();

  function handleSearch(val: string) {
    router.push(`${pathname}?search=${val}`);
  }

  return (
    <nav
      className="absolute z-50 w-full justify-between
    bg-[#000000] lg:fixed lg:flex lg:flex-row lg:items-center lg:px-5 lg:pb-2 lg:pt-4"
    >
      <div className="mt-2 flex items-center justify-center lg:mt-0 lg:justify-start">
        <Link href={`/`}>
          <Image
            src={"/images/logo-nav.png"}
            alt="Jupither"
            width={150}
            height={300}
          />
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <ul
          id="nav-menu"
          className="fixed bottom-0 flex w-full border-t border-gray-200/65 bg-[#000000] pt-2 text-center text-xs lg:relative lg:top-0
        lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-end lg:space-x-4 lg:border-none lg:pt-0 lg:text-lg"
        >
          <NavItem
            href="/"
            icon={<Bitcoin />}
            label="Crypto"
            cName={cn(
              pathname === "/" || params.symbol !== undefined
                ? "text-pink-400"
                : "",
            )}
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
          className="flex w-full cursor-pointer flex-row bg-[#000000]
      px-2 align-middle lg:relative lg:right-0 lg:w-auto lg:justify-end lg:p-0"
        >
          {!params.symbol && (
            <Searchbar
              cName="justify-end"
              isSearchOpen={isSearchOpen}
              searchToggle={searchToggle}
              onSearch={handleSearch}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, label, icon, cName = "" }: NavItemProps): ReactNode {
  return (
    <Link href={href} className="flex-1">
      <li>
        <i className={cn("flex items-center justify-center lg:hidden", cName)}>
          {icon}
        </i>
        <p className={cName}>{label}</p>
      </li>
    </Link>
  );
}
