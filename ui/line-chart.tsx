"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartData,
  ChartOptions,
  TooltipModel,
} from "chart.js";
import { formatMoney, funcDefaultReturn } from "@/lib/utils";

// Register the necessary components for Chart.js
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
);

type TooltipTextType = "title" | "body";

const createTooltipText = (type: TooltipTextType, text: string[]) => {
  const textElem = document.createElement("p");

  if (type === "title") {
    textElem.className = "text-[#E2E2E2] text-sm mb-3";
    const textNode = document.createTextNode(text[0]);
    textElem.appendChild(textNode);
  } else {
    textElem.className = "text-[#E2E2E2] text-sm";
    const spanElem = document.createElement("span");
    spanElem.className = "text-[#A2A2A2]";
    spanElem.textContent = text[0];
    const textNode = document.createTextNode(text[1]);
    textElem.appendChild(spanElem);
    textElem.appendChild(textNode);
  }

  return textElem;
};

const getOrCreateTooltip = (chart: ChartJS) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = `bg-slate-800 rounded-md text-white opacity-100 pointer-events-none 
    absolute transform translate-x-3 -translate-y-1/2 transition-all duration-100`;

    const innerDiv = document.createElement("div");
    innerDiv.className = "m-0 p-3 flex flex-col";
    innerDiv.id = "innerCoinDiv";

    tooltipEl.appendChild(innerDiv);
    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const updateTooltipContent = (
  tooltipEl: HTMLElement,
  chart: ChartJS,
  tooltip: TooltipModel<"line">,
) => {
  const titleLines = tooltip.title || [];
  const dataIndex = tooltip.dataPoints[0].dataIndex;

  const titleElem = createTooltipText("title", titleLines);
  const bodyDiv = document.createElement("div");

  chart.data.datasets.forEach((dataset) => {
    const textBody = [
      `${dataset.label}: `,
      `${formatMoney(dataset.data[dataIndex] as number)}`,
    ];
    const bodyElem = createTooltipText("body", textBody);
    bodyDiv.appendChild(bodyElem);
  });

  const innerDiv = tooltipEl.querySelector("#innerCoinDiv");

  if (innerDiv) {
    // so that the old tooltip hovered on gets removed
    while (innerDiv.firstChild) {
      innerDiv.firstChild.remove();
    }

    innerDiv.appendChild(titleElem);
    innerDiv.appendChild(bodyDiv);
  }
};

const setTooltipPosition = (
  tooltipEl: HTMLElement,
  chart: ChartJS,
  tooltip: TooltipModel<"line">,
) => {
  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  const viewportWidth = window.innerWidth;
  const tooltipWidth = tooltipEl.getBoundingClientRect().width;
  let tooltipX = positionX + tooltip.caretX;

  if (tooltipX + tooltipWidth > viewportWidth) {
    // when tooltip gets over right of screen, put on left side
    tooltipEl.style.left = `${positionX + tooltip.caretX - tooltipWidth - 25}px`;
  } else {
    tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
  }

  // to set the Y
  tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
};

const externalTooltipHandler = (context: {
  chart: ChartJS;
  tooltip: TooltipModel<"line">;
}) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // this is here to hide the tooltip when chart is not being hovered on
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  if (tooltip.body) {
    updateTooltipContent(tooltipEl, chart, tooltip);
  }

  tooltipEl.style.opacity = "1";
  setTooltipPosition(tooltipEl, chart, tooltip);
};

interface LineChartProps {
  datasets: ChartData<"line">["datasets"];
  labels: string[];
  xTickFormatter?: (label: string) => string;
}

const generateChartOptions = (
  labels: string[],
  xTickFormatter: (label: string) => string,
  hasY = true,
): ChartOptions<"line"> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: false,
        color: "#A2A2A2",
        maxRotation: 45,
        minRotation: 45,
        callback: function (value, index) {
          const width = window.innerWidth;
          const totalLabels = labels.length;
          const visibleLabelsCount = width < 500 ? 3 : 10;
          const stepSize = Math.ceil(totalLabels / visibleLabelsCount);
          return index % stepSize === 0 || index === totalLabels - 1
            ? xTickFormatter(labels[index])
            : "";
        },
      },
    },
    y: {
      display: hasY,
      ticks: {
        color: "#A2A2A2",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
    tooltip: {
      enabled: false,
      external: externalTooltipHandler,
    },
  },
  interaction: {
    intersect: false,
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 6,
      hoverBorderColor: "white",
      hoverBorderWidth: 2,
    },
  },
});

export function LineChart({
  datasets,
  labels,
  xTickFormatter = funcDefaultReturn,
}: LineChartProps) {
  const chartData = { labels, datasets };
  const options = generateChartOptions(labels, xTickFormatter);

  return <Line data={chartData} options={options} />;
}

export function LineChart2({
  datasets,
  labels,
  xTickFormatter = funcDefaultReturn,
}: LineChartProps) {
  const chartData = { labels, datasets };
  const options = generateChartOptions(labels, xTickFormatter, false);

  return <Line data={chartData} options={options} />;
}
