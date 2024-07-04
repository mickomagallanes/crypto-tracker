import { fetchCoinData } from "@/lib/fetching";
import { formatMoney, formatNumber } from "@/lib/utils";
import PriceChange from "@/ui/price-change";

import React, { ReactNode } from "react";

export default async function CoinInfo({ symbol }: { symbol: string }) {
  const data: APICoinData = await fetchCoinData(symbol);

  return (
    <div className="flex flex-col">
      <RowInfo
        title="Market Cap"
        value={
          <>
            <PriceChange
              cName="text-sm"
              price={data.market_data.market_cap_change_percentage_24h}
            />
            <p>{formatMoney(data.market_data.market_cap.usd)}</p>
          </>
        }
      />
      <RowInfo
        title="Fully Diluted M/C"
        value={formatMoney(data.market_data.fully_diluted_valuation.usd)}
      />

      <RowInfo
        title="Circulating Supply"
        value={formatNumber(data.market_data.circulating_supply)}
      />

      <RowInfo
        title="Total Supply"
        value={formatNumber(data.market_data.total_supply)}
      />

      <RowInfo
        title="Max Supply"
        value={
          data.market_data.max_supply
            ? formatNumber(data.market_data.max_supply)
            : `∞`
        }
      />
    </div>
  );
}

const RowInfo = ({
  title,
  value,
}: {
  title: string;
  value: string | number | ReactNode;
}) => {
  return (
    <div className="mt-4 flex flex-row justify-between">
      <p className="text-center text-xs text-[#A2A2A2] md:text-sm">{title}</p>
      <div className="flex flex-row text-center text-sm md:text-base">
        {value}
      </div>
    </div>
  );
};
