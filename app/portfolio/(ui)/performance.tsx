import { fetchMarketPerf } from "@/lib/fetching";
import { calculateValueChange, formatMoney } from "@/lib/utils";
import PercentChange from "@/ui/percent-change";
import PriceChange from "@/ui/price-change";

import React, { Suspense } from "react";
import PerfChart from "./perf-chart";
import PerfHeader from "./perf-header";

export default async function Performance() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Suspense key={"test3"} fallback={"Loading..."}>
          <PerfHeader />
        </Suspense>

        <div>
          <Suspense key={"test2"} fallback={"Loading..."}>
            <PerfChart />
          </Suspense>
        </div>
      </div>
    </>
  );
}
