"use client";
import { DoughnutChart, DoughnutDataset } from "@/ui/doughnut-chart";

export default function HoldChart({
  dataset,
  labels,
}: {
  dataset: DoughnutDataset;
  labels: string[];
}) {
  return (
    <>
      <div className="flex items-center align-middle">
        <DoughnutChart dataset={dataset} labels={labels} />
      </div>
    </>
  );
}
