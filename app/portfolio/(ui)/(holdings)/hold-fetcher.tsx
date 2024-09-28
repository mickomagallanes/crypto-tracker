"use client";
import DaysTabs from "@/ui/days-tabs";

import { portfolioMarket } from "@/lib/querying";
import { daysMarketQuery } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import HoldChart from "./hold-chart";
import HoldList from "./hold-list";

export default function HoldFetcher() {
  const holdings = usePortfolioStore((state) => state.holdings);

  const searchParams = useSearchParams();
  const currentDays = searchParams.get("daysHoldings") ?? "1";
  const coinsQuery = usePortfolioStore(
    (state) => state.computed.holdingsAsQuery,
  );

  const daysFormatted = daysMarketQuery(currentDays);

  let marketQuery = "";

  if (coinsQuery !== "") {
    marketQuery = `${coinsQuery}&days=${daysFormatted}`;
  }

  function generateColor(index: number, totalItems: number, alpha: number = 1) {
    const hue = (index * (360 / totalItems)) % 360; // Unique hue for each item
    const saturation = 60 + ((index * 10) % 20); // Slightly vary saturation
    const lightness = 50 + ((index * 10) % 10); // Slightly vary lightness

    return `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }

  const { data, isLoading } = useQuery(portfolioMarket(marketQuery));

  const getTotalPrice = () =>
    data?.reduce((total, asset) => {
      const holding = holdings.find((h) => h.symbol === asset.id);
      return total + (holding ? holding.quantity * asset.current_price : 0);
    }, 0);

  // TODO: check if there's an issue with generate color and store (after changing getHoldingsAsQuery)
  const getChartDataset = (portfTotalPrice: number) => {
    if (data) {
      let chartData = [];
      let labels = [];
      let coinPercentage = 0;
      let bgColors = [];
      let borderColors = [];

      for (const [coinIdx, coinObj] of data.entries()) {
        const holding = holdings.find((h) => h.symbol === coinObj.id);

        if (holding) {
          //   const currentPrice =
          //     holding.quantity *
          //     coinObj[
          //       `price_change_percentage_${daysFormatted}_in_currency` as `price_change_percentage_${CoinDayKey}_in_currency`
          //     ];
          const currentPrice = holding.quantity * coinObj.current_price;

          const borderColor = generateColor(coinIdx, data.length);
          const bgColor = generateColor(coinIdx, data.length, 0.3);

          labels.push(coinObj.id);
          // save prices of coins
          chartData.push(currentPrice);
          // save colors for coins
          bgColors.push(bgColor);
          borderColors.push(borderColor);
          coinPercentage = (currentPrice / portfTotalPrice) * 100;
        }
      }

      return { chartData, bgColors, borderColors, labels, coinPercentage };
    } else {
      return null;
    }
  };

  const totalPrice = getTotalPrice();

  const chartDataset = getChartDataset(totalPrice ?? 0);

  const dataset = {
    data: chartDataset?.chartData ?? [],
    backgroundColor: chartDataset?.bgColors ?? [],
    borderColor: chartDataset?.borderColors ?? [],
  };
  return (
    <div className="flex flex-col items-center gap-10">
      <HoldChart dataset={dataset} labels={chartDataset?.labels ?? []} />

      <HoldList />

      <DaysTabs paramKey="daysHoldings" />
      {/* <PerfModal /> */}
    </div>
  );
}
