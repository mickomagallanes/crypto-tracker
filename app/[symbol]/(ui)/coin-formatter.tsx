"use client";
import { LineChart } from "@/ui/line-chart";

import { ChartData } from "chart.js";
import React from "react";

export default function CoinFormatter({
  datasets,
  labels,
}: {
  datasets: ChartData<"line">["datasets"];
  labels: string[];
}) {
  return (
    <div className="h-[350px] md:order-3 md:size-full md:h-[550px]">
      <LineChart
        datasets={datasets}
        labels={labels}
        xTickFormatter={(val) => val.slice(0, 10)}
      />
    </div>
  );
}
