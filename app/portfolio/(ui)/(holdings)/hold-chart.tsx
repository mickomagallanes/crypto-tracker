import React from "react";
import { DoughnutChart, DoughnutDataset } from "@/ui/doughnut-chart";

export default function HoldChart({ dataset }: { dataset: DoughnutDataset }) {
  return (
    <>
      <div className="flex items-center align-middle">
        <DoughnutChart dataset={dataset} labels={["XRP", "BTC"]} />
      </div>
    </>
  );
}
