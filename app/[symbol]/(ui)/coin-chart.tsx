import React from "react";
import { formatComplete } from "@/lib/date-utils";
import CoinFormatter from "./coin-formatter";
import { fetchHistData } from "@/lib/fetching";

export default async function CoinChart({
  symbol,
  days = "1",
}: {
  symbol: string;
  days?: string;
}) {
  const data: APIHistData = await fetchHistData(symbol, days);

  const { timestamp, prices } = data.prices.reduce(
    (acc: { timestamp: string[]; prices: number[] }, current: number[]) => {
      acc.timestamp.push(formatComplete(current[0]));
      acc.prices.push(current[1]);
      return acc;
    },
    { timestamp: [], prices: [] },
  );

  const volumes = data.total_volumes.map((vol: number[]) => vol[1]);

  const datasets = [
    {
      label: "Price",
      data: prices,
      backgroundColor: "rgba(50, 202, 91, 0.2)",
      borderColor: "rgba(50, 202, 91)",
      borderWidth: 2,
      fill: true,
    },
    {
      label: "Volumes",
      data: volumes,
      hidden: true,
    },
  ];

  return (
    <>
      <CoinFormatter datasets={datasets} labels={timestamp} />
    </>
  );
}
