"use client";
import DaysTabs from "@/ui/days-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PerfChart from "./perf-chart";
import PerfHeaderWrap from "./perf-header-wrap";

const queryClient = new QueryClient();

export default function Performance() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center gap-10">
          <PerfHeaderWrap />

          <PerfChart />

          <DaysTabs paramKey="daysPerformance" />
        </div>
      </QueryClientProvider>
    </>
  );
}
