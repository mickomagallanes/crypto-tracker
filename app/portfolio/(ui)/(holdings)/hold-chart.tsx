import React from "react";
import { DoughnutChart } from "@/ui/doughnut-chart";

export default function HoldChart({ dataset }) {
  return (
    <>
      <div className="size-[325px]">
        <DoughnutChart dataset={dataset} labels={["XRP", "BTC"]} />
      </div>
    </>
  );
}
