import React, { Suspense } from "react";
import PerfChart from "./perf-chart";
import PerfHeader from "./perf-header";
import DaysTabs from "@/ui/days-tabs";
import PerfModal from "./perf-modal";

export default async function Performance() {
  // TODO: use "perf-days" and "pie-days" as param in url
  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Suspense key={"test3"} fallback={"Loading..."}>
          <PerfHeader />
        </Suspense>

        <Suspense key={"test2"} fallback={"Loading..."}>
          <PerfChart />
        </Suspense>

        <DaysTabs />
        {/* <PerfModal /> */}
      </div>
    </>
  );
}
