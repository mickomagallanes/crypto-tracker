"use client";

import { calculateValueChange, formatMoney } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio-store";
import PercentChange from "@/ui/percent-change";
import PriceChange from "@/ui/price-change";

import React from "react";
import PerfHeaderSkeleton from "../../(skeleton)/(perf)/perf-header-skeleton";

export default function PerfHeader({
  data,
  isLoading,
}: {
  data: APIMarketData | [];
  isLoading: boolean;
}) {
  const holdings = usePortfolioStore((state) => state.holdings);

  const price = data.reduce((acc, val) => {
    const holding = holdings.find((h) => h.symbol === val.id); // Find the holding by symbol
    return acc + (holding ? holding.quantity * val.current_price : 0);
  }, 0);

  const priceChange = data.reduce((acc, val) => {
    const holding = holdings.find((h) => h.symbol === val.id); // Find the holding by symbol
    return (
      acc +
      (holding
        ? calculateValueChange(
            val.current_price,
            val.price_change_percentage_24h,
            holding.quantity,
          )
        : 0)
    );
  }, 0);

  const totalOldVal = price - priceChange;
  const totalPercentChange = totalOldVal
    ? ((price - totalOldVal) / totalOldVal) * 100
    : 0;

  return (
    <>
      {isLoading ? (
        <PerfHeaderSkeleton />
      ) : (
        <div className="flex flex-col items-center">
          <p className="mr-2 text-3xl font-bold leading-10 text-gray-50 md:text-4xl">
            {formatMoney(price)}
          </p>
          <div className="mx-auto mt-1 flex flex-row">
            <PriceChange cName="text-sm" price={priceChange} />
            <PercentChange
              cName="text-sm px-0 bg-green-800 bg-opacity-20 rounded-md"
              percent={totalPercentChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
