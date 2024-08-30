"use client";
import React, { Suspense } from "react";
import PerfChart from "./perf-chart";
import DaysTabs from "@/ui/days-tabs";
import PerfHeaderWrap from "./perf-header-wrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Performance() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center gap-10">
          <PerfHeaderWrap />

          <Suspense key={"test2"} fallback={"Loading..."}>
            <PerfChart />
          </Suspense>

          <DaysTabs paramKey="daysPerformance" />
        </div>
      </QueryClientProvider>
    </>
  );
}
