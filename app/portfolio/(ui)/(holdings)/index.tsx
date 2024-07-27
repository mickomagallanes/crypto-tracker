import React, { Suspense } from "react";
import DaysTabs from "@/ui/days-tabs";

import HoldList from "./hold-list";
import HoldChart from "./hold-chart";

export default async function Holdings() {
  // TODO: use "perf-days" and "pie-days" as param in url
  const dataset = {
    data: [12, 19, 3, 5, 2, 42],
    backgroundColor: [
      "rgba(255, 99, 132, 0.3)",
      "rgba(54, 162, 235, 0.3)",
      "rgba(255, 206, 86, 0.3)",
      "rgba(75, 192, 192, 0.3)",
      "rgba(153, 102, 255, 0.3)",
      "rgba(255, 159, 64, 0.3)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
  };
  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Suspense key={"test3"} fallback={"Loading..."}>
          <HoldChart dataset={dataset} />
        </Suspense>

        <Suspense key={"test2"} fallback={"Loading..."}>
          <HoldList />
        </Suspense>

        <DaysTabs />
        {/* <PerfModal /> */}
      </div>
    </>
  );
}
