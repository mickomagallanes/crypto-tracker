import React from "react";

export default function PerfHeaderSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="p-2 text-center text-3xl font-bold leading-10 text-gray-50 sm:p-4 md:text-4xl">
          <div className="w-48 animate-pulse rounded-md bg-neutral-700 p-5"></div>
        </div>
        <div className="mx-auto flex flex-row">
          <div className="w-5 animate-pulse rounded-md bg-neutral-700 p-3"></div>
          <div className="ml-1 w-10 animate-pulse rounded-md bg-neutral-700 p-3"></div>
        </div>
      </div>
    </>
  );
}
