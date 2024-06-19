import React from "react";
import { GET_OPTIONS } from "@/lib/utils";
import { formatComplete } from "@/lib/date-utils";
import CoinFormatter from "./coin-formatter";

export default async function CoinChart({
  symbol,
  days = "1",
}: {
  symbol: string;
  days?: string;
}) {
  const fetchHistData = async () => {
    return fetch(
      `${process.env.API_URL}/coins/${symbol}/market_chart?days=${days}&vs_currency=usd&x_cg_demo_api_key=${process.env.API_KEY}`,
      {
        ...GET_OPTIONS,
        cache: "no-store",
      },
    );
  };

  const resp = await fetchHistData();
  const data = await resp.json();

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
    <div className="h-[350px] md:h-[500px]">
      <CoinFormatter datasets={datasets} labels={timestamp} />
    </div>
  );
}
