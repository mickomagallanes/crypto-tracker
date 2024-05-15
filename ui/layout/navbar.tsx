import {
  AlignLeft,
  Bitcoin,
  BriefcaseBusiness,
  Newspaper,
  Search,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="sm:flex sm:flex-row">
      <ul
        id="nav-menu"
        className="fixed bottom-0 grid w-full grid-cols-3 border-t border-gray-200/65 pt-2 text-center
        sm:top-0 sm:flex sm:flex-row sm:gap-4 sm:border-none sm:text-lg"
      >
        <li>
          <i className="flex items-center justify-center sm:hidden">
            <Bitcoin />
          </i>
          <Link href="/">Crypto</Link>
        </li>
        <li>
          <i className="flex items-center justify-center sm:hidden">
            <BriefcaseBusiness />
          </i>
          <Link href="/portfolio"> Portfolio</Link>
        </li>
        <li>
          <i className="flex items-center justify-center sm:hidden">
            <Newspaper />
          </i>
          <Link href="/news">News</Link>
        </li>
      </ul>

      <div className="mt-2 flex flex-row">
        <i className="ml-2 flex items-center justify-center rounded-l-md bg-gray-500 pl-1 sm:hidden">
          <Search size="18" />
        </i>
        <input
          type="text"
          className="mr-2 size-full rounded-r-md bg-gray-500 p-2 text-sm"
        />
      </div>
    </nav>
  );
}
