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

interface ChartProps {
  datasets: ChartData<"line">["datasets"];
  labels: string[];
  xTickFormatter?: (label: string) => string;
}

const createTooltipText = (type: string, text: string[]) => {
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
  let tooltipEl = chart.canvas.parentNode?.querySelector("div") as HTMLElement;

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

const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const dataIndex = tooltip.dataPoints[0].dataIndex;

    const titleElem = createTooltipText("title", titleLines);
    const bodyDiv = document.createElement("div");

    // add the text based on the dataset
    chart.data.datasets.forEach((body: { data: []; label: string }) => {
      const textBody = [
        `${body.label}: `,
        `${formatMoney(body.data[dataIndex])}`,
      ];
      const bodyElem = createTooltipText("body", textBody);
      bodyDiv.appendChild(bodyElem);
    });

    const innerDiv = tooltipEl.querySelector("#innerCoinDiv");

    if (innerDiv) {
      while (innerDiv.firstChild) {
        innerDiv.firstChild.remove();
      }

      // Add updated tooltip text
      innerDiv.appendChild(titleElem);
      innerDiv.appendChild(bodyDiv);
    }
  }

  // set tooltip position
  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  const viewportWidth = window.innerWidth;

  const tooltipWidth = tooltipEl.getBoundingClientRect().width;

  let tooltipX = positionX + tooltip.caretX;

  // Adjust tooltip position if it goes beyond the right edge of the viewport
  if (tooltipX + tooltipWidth > viewportWidth) {
    tooltipEl.style.left =
      positionX + tooltip.caretX - tooltipWidth - 25 + "px";
  } else {
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
  }

  // Display, position, and set styles for font
  tooltipEl.style.opacity = "1";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
};

export default function LineChart({
  datasets,
  labels,
  xTickFormatter = funcDefaultReturn,
}: ChartProps) {
  // Chart data object containing labels and dataset
  const chartData: ChartData<"line"> = {
    labels: labels,
    datasets: datasets,
  };

  // Chart options object for customization
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowValues: true,

    scales: {
      x: {
        grid: {
          // the line at the chart
          display: false,
        },
        ticks: {
          autoSkip: false,
          // the labels below, like the time or month
          color: "#A2A2A2",
          maxRotation: 45,
          minRotation: 45,
          callback: function (value: any, index: number) {
            const width = window.innerWidth;
            const totalLabels = labels.length;
            const visibleLabelsCount = width < 500 ? 3 : 10; // Adjust this value as needed
            const stepSize = Math.ceil(totalLabels / visibleLabelsCount);
            return index % stepSize === 0 || index === totalLabels - 1
              ? xTickFormatter(labels[index])
              : "";
          },
        },
      },
      y: {
        ticks: {
          color: "#A2A2A2",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
    interaction: {
      intersect: false,
    },
    elements: {
      // the points in line
      point: {
        radius: 0, // Disable point radius to hide data points
        hoverRadius: 6,
        hoverBorderColor: "white",
        hoverBorderWidth: 2,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
