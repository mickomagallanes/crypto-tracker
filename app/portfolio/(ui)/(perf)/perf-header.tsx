import { fetchMarketPortfolio } from "@/lib/fetching";
import { calculateValueChange, formatMoney } from "@/lib/utils";
import PercentChange from "@/ui/percent-change";
import PriceChange from "@/ui/price-change";

import React from "react";

export default async function PerfHeader() {
  const data: APIMarketData = await fetchMarketPortfolio(
    "&ids=bitcoin,ripple&price_change_percentage=24h",
  );

  const holds = { bitcoin: 0.005, ripple: 1038.1 };

  type HoldKeys = keyof typeof holds;

  const price = data.reduce(
    (acc, val) => acc + holds[val.id as HoldKeys] * val.current_price,
    0,
  );

  const priceChange = data.reduce(
    (acc, val) =>
      acc +
      calculateValueChange(
        val.current_price,
        val.price_change_percentage_24h,
        holds[val.id as HoldKeys],
      ),
    0,
  );

  const totalOldVal = price - priceChange;
  const totalPercentChange = ((price - totalOldVal) / totalOldVal) * 100;

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
