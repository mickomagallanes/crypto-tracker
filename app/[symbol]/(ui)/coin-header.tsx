import { fetchCoinData } from "@/lib/fetching";
import { daysMarketQuery } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function CoinHeader({
  days,
  symbol,
}: {
  days: string;
  symbol: string;
}) {
  const resp = await fetchCoinData(symbol);
  const data = await resp.json();

  // TODO: finish header
  return (
    <>
      <div className="flex flex-row gap-2">
        <div>
          <Image
            src={data.image.small}
            alt="Crypto logo"
            width={24}
            height={24}
          />
        </div>

        <p>{data.name}</p>
        <p className="font-light sm:block">{data.symbol.toUpperCase()}</p>
      </div>
    </>
  );
}
