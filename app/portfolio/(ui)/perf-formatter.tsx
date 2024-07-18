"use client";
import { LineChart, LineChart2 } from "@/ui/line-chart";

import { ChartData } from "chart.js";
import React from "react";

export default function PerfFormatter({
  datasets,
  labels,
}: {
  datasets: ChartData<"line">["datasets"];
  labels: string[];
}) {
  return (
    <div className="h-[350px] ">
      <LineChart2
        datasets={datasets}
        labels={labels}
        xTickFormatter={(val) => val.slice(0, 10)}
      />
    </div>
  );
}
