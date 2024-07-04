import React from "react";

export default function InfoSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-1">
      <div className="mt-4 flex flex-row justify-between">
        <div className="h-3 w-full rounded-md bg-slate-200"></div>
      </div>
      <div className="mt-4 flex flex-row justify-between">
        <div className="h-3 w-full rounded-md bg-slate-200"></div>
      </div>

      <div className="mt-4 flex flex-row justify-between">
        <div className="h-3 w-full rounded-md bg-slate-200"></div>
      </div>

      <div className="mt-4 flex flex-row justify-between">
        <div className="h-3 w-full rounded-md bg-slate-200"></div>
      </div>

      <div className="mt-4 flex flex-row justify-between">
        <div className="h-3 w-full rounded-md bg-slate-200"></div>
      </div>
    </div>
  );
}
