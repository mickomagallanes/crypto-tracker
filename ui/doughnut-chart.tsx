"use client";
import { formatMoney } from "@/lib/utils";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutDataset {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
}

export function DoughnutChart({
  labels,
  dataset,
}: {
  labels: string[];
  dataset: DoughnutDataset;
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
          label: function (context) {
            console.log(context, " context");
            return formatMoney(context.raw);
          },
          title: function (context) {
            return context[0].label;
          },
        },
      },
    },
  };

  // TODO: when hovering doughnut, it exceeds the box and some parts become not visible
  return (
    <div className="relative flex size-[320px] flex-col items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
