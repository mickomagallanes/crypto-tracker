"use client";

import { calculateValueChange, formatMoney } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio-store";
import PercentChange from "@/ui/percent-change";
import PriceChange from "@/ui/price-change";

export default function PerfHeader({
  data,
  days,
}: {
  data: APIMarketData | [];
  days: string;
}) {
  const holdings = usePortfolioStore((state) => state.holdings);

  const calculateTotalPrice = () =>
    data.reduce((total, asset) => {
      const holding = holdings.find((h) => h.symbol === asset.id);
      return total + (holding ? holding.quantity * asset.current_price : 0);
    }, 0);

  const calculateTotalPriceChange = () =>
    data.reduce((total, asset) => {
      const holding = holdings.find((h) => h.symbol === asset.id);
      return (
        total +
        (holding
          ? calculateValueChange(
              asset.current_price,
              asset[
                `price_change_percentage_${days}_in_currency` as `price_change_percentage_${CoinDayKey}_in_currency`
              ],
              holding.quantity,
            )
          : 0)
      );
    }, 0);

  const price = calculateTotalPrice();
  const priceChange = calculateTotalPriceChange();

  const totalOldVal = price - priceChange;
  const totalPercentChange = totalOldVal
    ? ((price - totalOldVal) / totalOldVal) * 100
    : 0;

  return (
    <>
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
    </>
  );
}
