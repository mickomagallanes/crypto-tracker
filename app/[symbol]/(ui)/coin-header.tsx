import { fetchCoinData } from "@/lib/fetching";
import { daysMarketQuery, formatMoney } from "@/lib/utils";
import PercentChange from "@/ui/percent-change";

import Image from "next/image";
import React from "react";

export default async function CoinHeader({
  days = "1",
  symbol,
}: {
  days: string;
  symbol: string;
}) {
  const data: APICoinData = await fetchCoinData(symbol);

  const dayKey = daysMarketQuery(days);
  const currentPrice = data.market_data.current_price.usd;
  const priceChange =
    data.market_data[
      `price_change_percentage_${dayKey}` as `price_change_percentage_${CoinDayKey}`
    ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-1">
          <div>
            <Image
              src={data.image.small}
              alt="Crypto logo"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-lg">{data.name}</p>
            <p className="text-sm font-light sm:block">
              {data.symbol.toUpperCase()}
            </p>
            <span className="ml-2 rounded-md bg-gray-300/20 px-1.5 py-0.5 text-xs text-gray-200">
              #{data.market_cap_rank}
            </span>
          </div>
        </div>

        <div className="flex flex-row">
          <p className="mr-2 text-3xl font-bold leading-10 text-gray-50  md:text-4xl">
            {formatMoney(currentPrice)}
          </p>
          <PercentChange percent={priceChange} />
        </div>
      </div>
    </>
  );
}
