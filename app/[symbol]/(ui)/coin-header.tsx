import { fetchCoinData } from "@/lib/fetching";
import GLOBAL_ICONS from "@/lib/icons";
import { cn, daysMarketQuery, formatMoney } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function CoinHeader({
  days = "1",
  symbol,
}: {
  days: string;
  symbol: string;
}) {
  const resp = await fetchCoinData(symbol);
  const data = await resp.json();
  const dayKey = daysMarketQuery(days);
  const currentPrice = data.market_data.current_price.usd;
  const priceChange = data.market_data[`price_change_percentage_${dayKey}`];

  // TODO: finish header
  return (
    <>
      <div className="flex flex-col gap-2">
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
              #1
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <p className="text-3xl font-bold leading-10 text-gray-50  md:text-4xl">
            {formatMoney(currentPrice)}
          </p>
          <i className="flex items-center text-6xl sm:text-sm">
            {priceChange < 0
              ? GLOBAL_ICONS.caretDownSm
              : GLOBAL_ICONS.caretUpSm}
          </i>
          <p
            className={cn(
              "flex items-center",
              priceChange < 0 ? "text-red-600" : "text-green-500",
            )}
          >
            {Math.abs(priceChange).toFixed(2)}%
          </p>
        </div>
      </div>
    </>
  );
}
