"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function DaysTabs() {
  const searchParams = useSearchParams();
  const currentDays = searchParams.get("days");

  const pathname = usePathname();

  const isActive = (dayValue: string) => {
    if (
      currentDays === dayValue ||
      (currentDays === null && dayValue === "1") // default highlight by 1
    ) {
      return `bg-gray-900 text-pink-400 px-3`;
    } else {
      return `px-2`;
    }
  };

  return (
    <div className="flex w-max flex-row flex-wrap gap-2 rounded-lg bg-gray-800 p-1 text-center text-[13px]">
      <Link
        className={cn("m-auto rounded-md py-1", isActive("1"))}
        href={`${pathname}?days=1`}
      >
        1D
      </Link>
      <Link
        className={cn("m-auto rounded-md py-1", isActive("7"))}
        href={`${pathname}?days=7`}
      >
        7D
      </Link>
      <Link
        className={cn("m-auto rounded-md py-1", isActive("30"))}
        href={`${pathname}?days=30`}
      >
        1M
      </Link>
      <Link
        className={cn("m-auto rounded-md py-1", isActive("60"))}
        href={`${pathname}?days=60`}
      >
        2M
      </Link>
      <Link
        className={cn("m-auto rounded-md py-1", isActive("365"))}
        href={`${pathname}?days=365`}
      >
        1Y
      </Link>
    </div>
  );
}
