"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DaysTabs({ paramKey = "days" }: { paramKey?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the current days value from searchParams
  const currentDays = searchParams.get(paramKey) || "1"; // default to "1" if no param is present

  const tabOptions = [
    { label: "1D", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "200D", value: "200" },
    { label: "1Y", value: "365" },
  ];

  const isActive = (dayValue: string) => {
    return currentDays === dayValue;
  };

  const onClickLink = (paramValue: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set(paramKey, paramValue);
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  return (
    <div className="flex w-max flex-row flex-wrap gap-2 rounded-lg bg-gray-800 p-1 text-center text-sm md:text-base">
      {tabOptions.map((tab) => (
        <span
          key={tab.value}
          role="tab"
          aria-selected={isActive(tab.value)}
          className={cn(
            "m-auto cursor-pointer rounded-md py-1",
            isActive(tab.value)
              ? "bg-gray-900 px-3 text-pink-400 md:px-4"
              : "px-2 md:px-3",
          )}
          onClick={() => onClickLink(tab.value)}
        >
          {tab.label}
        </span>
      ))}
    </div>
  );
}
