"use client";
import { formatComplete } from "@/lib/date-utils";
import { fetchHistData } from "@/lib/fetching";
import React from "react";
import PerfFormatter from "./perf-formatter";
import { usePortfolioStore } from "@/store/portfolio-store";
import { useQuery } from "@tanstack/react-query";
import { portfolioHistory } from "@/lib/querying";
import { useSearchParams } from "next/navigation";
import ChartSkeleton from "@/ui/skeleton/chart-skeleton";

export default function PerfChart() {
  const getUniqueSymbols = usePortfolioStore((state) => state.getUniqueSymbols);
  const holdings = usePortfolioStore((state) => state.holdings);
  const currentSymbols = getUniqueSymbols();
  const searchParams = useSearchParams();

  const currentDays = searchParams.get("daysPerformance") ?? "1";
  let coinsPriceArr = [];

  const { data, isLoading } = useQuery(
    portfolioHistory(currentSymbols, currentDays),
  );

  if (data === undefined || isLoading) {
    return <ChartSkeleton />;
  } else {
    // to calculate the total dollar value in the current selected day
    for (const priceHist of data) {
      const dollarHistArr = priceHist.data.prices.reduce(
        (acc: { timestamp: string[]; prices: number[] }, current: number[]) => {
          acc.timestamp.push(formatComplete(current[0]));
          const matchedHolding = holdings.find(
            (holding) => holding.symbol === priceHist.symbol,
          );
          if (matchedHolding) {
            acc.prices.push(current[1] * matchedHolding?.quantity);
          }

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
}
