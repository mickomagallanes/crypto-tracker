import React from "react";

export default function HeaderSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="flex flex-row items-center gap-1">
        <div className="h-4 w-1/4 rounded-md bg-slate-200"></div>
      </div>

      <div className="flex h-10 w-3/5 flex-row gap-1 rounded-md bg-slate-200"></div>
    </div>
  );
}
