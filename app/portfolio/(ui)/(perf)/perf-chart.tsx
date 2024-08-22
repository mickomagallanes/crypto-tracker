import { formatComplete } from "@/lib/date-utils";
import { fetchHistData } from "@/lib/fetching";
import React from "react";
import PerfFormatter from "./perf-formatter";

export default async function PerfChart() {
  const coinsPriceArr = [];
  const coinsList = ["bitcoin", "ripple"];
  // TODO: data from store
  const holds = { bitcoin: 0.005, ripple: 1038.1 };
  type HoldKeys = keyof typeof holds;

  // to calculate the total dollar value in the current selected day
  for (const coin of coinsList) {
    // TODO: dynamic day from daytab
    const data: APIHistData = await fetchHistData(coin, "1");

    const dollarHistArr = data.prices.reduce(
      (acc: { timestamp: string[]; prices: number[] }, current: number[]) => {
        acc.timestamp.push(formatComplete(current[0]));
        acc.prices.push(current[1] * holds[coin as HoldKeys]);
        return acc;
      },
      { timestamp: [], prices: [] },
    );

    coinsPriceArr.push(dollarHistArr);
  }

  const { prices: totalPrices, timestamp } = coinsPriceArr.reduce(
    (
      acc: { timestamp: string[]; prices: number[] },
      current: { timestamp: string[]; prices: number[] },
    ) => {
      acc.timestamp = current.timestamp;
      acc.prices = acc.prices.map(
        (price, indx) => current.prices[indx] + price,
      );

      return acc;
    },
  );

  const datasets = [
    {
      label: "Price",
      data: totalPrices,
      backgroundColor: "rgba(50, 202, 91, 0.2)",
      borderColor: "rgba(50, 202, 91)",
      borderWidth: 2,
      fill: true,
    },
  ];

  return <PerfFormatter datasets={datasets} labels={timestamp} />;
}
