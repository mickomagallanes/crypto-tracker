// "use client";
import { GET_OPTIONS, cn } from "@/lib/utils";
import Table, { TableColumn } from "@/ui/table";
import Image from "next/image";

import { ReactNode } from "react";

interface Roi {
  times: numOrNull;
  currency: strOrNull;
  percentage: numOrNull;
}
interface ApiData {
  id: strOrNull;
  symbol: strOrNull;
  name: strOrNull;
  image: strOrNull;
  current_price: numOrNull;
  market_cap: numOrNull;
  market_cap_rank: numOrNull;
  fully_diluted_valuation: numOrNull;
  total_volume: numOrNull;
  high_24h: numOrNull;
  low_24h: numOrNull;
  price_change_24h: numOrNull;
  price_change_percentage_24h: numOrNull;
  market_cap_change_24h: numOrNull;
  market_cap_change_percentage_24h: numOrNull;
  circulating_supply: numOrNull;
  total_supply: numOrNull;
  max_supply: numOrNull;
  ath: numOrNull;
  ath_change_percentage: numOrNull;
  ath_date: strOrNull;
  atl: numOrNull;
  atl_change_percentage: numOrNull;
  atl_date: strOrNull;
  roi: Roi | null;
  last_updated: strOrNull;
}

interface TransformedData {
  id: numOrNull;
  name: strOrNull;
  symbol: strOrNull;
  image: string;
  price: numOrNull;
  marketCap: numOrNull;
  "24h": numOrNull;
}

// Function to transform the data
const transformData = (data: ApiData[]): TransformedData[] => {
  return data.map((item) => ({
    id: item.market_cap_rank,
    name: item.name,
    symbol: item.symbol ? item.symbol.toUpperCase() : null,
    image: item.image ?? "",
    price: item.current_price,
    marketCap: item.market_cap,
    "24h": item.market_cap_change_percentage_24h,
  }));
};

const cryptoColumns: TableColumn[] = [
  { header: "#", key: "id" },
  {
    header: "Name",
    key: "name",
    customRender: (dataRow): ReactNode => {
      return (
        <>
          <div className="flex flex-row gap-2">
            <Image
              src={dataRow.image}
              alt="Crypto logo"
              width={24}
              height={24}
            />

            <p>{dataRow.name}</p>
            <p>{dataRow.symbol}</p>
          </div>
        </>
      );
    },
  },
  {
    header: "24h %",
    key: "24h",
    customRender: (dataRow): ReactNode => {
      return (
        <>
          <p
            className={cn(
              dataRow["24h"] < 0 ? "text-red-600" : "text-green-500",
            )}
          >
            {dataRow["24h"]}
          </p>
        </>
      );
    },
  },
  {
    header: "Price",
    key: "price",
    customRender: (dataRow): ReactNode => {
      return (
        <>
          <p
            className={cn(
              dataRow["24h"] < 0 ? "text-red-600" : "text-green-500",
            )}
          >
            ${dataRow.price}
          </p>
        </>
      );
    },
  },
];

export default async function Home() {
  const resp = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_rank&x_cg_demo_api_key=${process.env.API_KEY}`,
    GET_OPTIONS,
  );

  const result = await resp.json();
  console.log(result);
  const transformedData = transformData(result);

  return (
    <>
      <Table columns={cryptoColumns} data={transformedData} />
    </>
  );
}
