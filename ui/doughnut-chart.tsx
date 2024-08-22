"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Dataset {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
}

export function DoughnutChart({
  labels,
  dataset,
}: {
  labels: string[];
  dataset: Dataset;
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        borderWidth: 1,
        hoverOffset: 15,
        ...dataset,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          labelColor: function (context: TooltipItem<"doughnut">) {
            const dataset = context.dataset;
            const dataIndex = context.dataIndex;

            const backgroundColor =
              (dataset.borderColor as string[])[dataIndex] || "#000000";

            return {
              borderColor: backgroundColor,
              backgroundColor: backgroundColor,
            };
          },
        },
      },
    },
  };

  // TODO: when hovering doughnut, it exceeds the box and some parts become not visible
  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
