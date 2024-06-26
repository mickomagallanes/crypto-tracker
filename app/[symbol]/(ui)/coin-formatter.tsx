"use client";
import LineChart from "@/ui/generic/line-chart";

import { ChartData } from "chart.js";
import React from "react";

interface ChartProps {
  datasets: ChartData<"line">["datasets"];
  labels: string[];
}

export default function CoinFormatter({ datasets, labels }: ChartProps) {
  // TODO: tick formatter should depend on the days
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
