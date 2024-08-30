"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export default function DaysTabs({ paramKey = "days" }: { paramKey?: string }) {
  const searchParams = useSearchParams();

  const currentDays = searchParams.get(paramKey);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (dayValue: string) => {
    if (
      currentDays === dayValue ||
      (currentDays === null && dayValue === "1") // default highlight by 1
    ) {
      return `bg-gray-900 text-pink-400 px-3 md:px-4`;
    } else {
      return `px-2 md:px-3`;
    }
  };

  const onClickLink = (paramValue: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    // Add or update a new query parameter while keeping the existing ones
    updatedSearchParams.set(paramKey, paramValue);

    // Programmatically push the new URL with updated search params
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  return (
    <div className="flex w-max flex-row flex-wrap gap-2 rounded-lg bg-gray-800 p-1 text-center text-sm md:text-base">
      <span
        className={cn("m-auto cursor-pointer rounded-md py-1", isActive("1"))}
        onClick={() => onClickLink("1")}
      >
        1D
      </span>
      <span
        className={cn("m-auto cursor-pointer rounded-md py-1", isActive("7"))}
        onClick={() => onClickLink("7")}
      >
        7D
      </span>
      <span
        className={cn("m-auto cursor-pointer rounded-md py-1", isActive("30"))}
        onClick={() => onClickLink("30")}
      >
        1M
      </span>
      <span
        className={cn("m-auto cursor-pointer rounded-md py-1", isActive("200"))}
        onClick={() => onClickLink("200")}
      >
        200D
      </span>
      <span
        className={cn("m-auto cursor-pointer rounded-md py-1", isActive("365"))}
        onClick={() => onClickLink("365")}
      >
        1Y
      </span>
    </div>
  );
}
