"use client";
import LineChart from "@/ui/generic/line-chart";
import Tabs from "@/ui/generic/tabs";
import { ChartData } from "chart.js";
import React from "react";

interface ChartProps {
  datasets: ChartData<"line">["datasets"];
  labels: string[];
}

export default function CoinFormatter({ datasets, labels }: ChartProps) {
  // TODO: tick formatter should depend on the days
  return (
    <>
      <Tabs />
      <LineChart
        datasets={datasets}
        labels={labels}
        xTickFormatter={(val) => val.slice(0, 10)}
      />
    </>
  );
}
