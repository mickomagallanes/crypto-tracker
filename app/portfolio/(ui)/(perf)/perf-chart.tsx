"use client";
import { formatComplete } from "@/lib/date-utils";
import { portfolioHistory } from "@/lib/querying";
import { usePortfolioStore } from "@/store/portfolio-store";
import { LineChart2 } from "@/ui/line-chart";
import ChartSkeleton from "@/ui/skeleton/chart-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function PerfChart() {
  const getUniqueSymbols = usePortfolioStore((state) => state.getUniqueSymbols);
  const holdings = usePortfolioStore((state) => state.holdings);
  const currentSymbols = getUniqueSymbols();
  const searchParams = useSearchParams();

  const currentDays = searchParams.get("daysPerformance") ?? "1";

  const { data, isLoading } = useQuery(
    portfolioHistory(currentSymbols, currentDays),
  );

  const calculateDollarHistory = (priceHist: any) => {
    return priceHist.data.prices.reduce(
      (
        acc: { timestamp: string[]; prices: number[] },
        [timestamp, price]: number[],
      ) => {
        const matchedHolding = holdings.find(
          (holding) => holding.symbol === priceHist.symbol,
        );
        acc.timestamp.push(formatComplete(timestamp));

        if (matchedHolding) {
          acc.prices.push(price * matchedHolding?.quantity);
        }
        return acc;
      },
      { timestamp: [], prices: [] },
    );
  };

  if (data === undefined || isLoading) {
    return <ChartSkeleton />;
  }

  // Calculate total dollar value for all holdings
  const coinsPriceArr = data.map(calculateDollarHistory);

  // Merge all prices across different symbols
  const {
    prices: totalPrices,
    timestamp,
  }: { prices: number[]; timestamp: string[] } = coinsPriceArr.reduce(
    // loop around different coins
    (
      acc: { timestamp: string[]; prices: number[] },
      current: { timestamp: string[]; prices: number[] },
    ) => {
      if (acc.prices.length === 0) {
        acc.prices = current.prices;
      } else {
        // add the prices of current coin to the previous coins/coin (accumulator)
        acc.prices = acc.prices.map(
          (price, index) => price + (current.prices[index] ?? 0),
        );
      }
      acc.timestamp = current.timestamp; // Assuming all timestamps are the same
      return acc;
    },
    { timestamp: [], prices: [] },
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

  return (
    <div className="h-[275px] w-full">
      <LineChart2
        datasets={datasets}
        labels={timestamp}
        xTickFormatter={(val) => val.slice(0, 10)}
      />
    </div>
  );
}
