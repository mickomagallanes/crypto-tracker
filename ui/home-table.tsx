"use client";

import React, { ReactNode } from "react";
import Table, { DataRow, TableColumn } from "./generic/table";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GLOBAL_ICONS from "@/lib/icons";

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
  market_cap_rank: number;
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
  id: number;
  name: strOrNull;
  symbol: strOrNull;
  image: string;
  price: numOrNull;
  marketCap: numOrNull;
  "24h": numOrNull;
}

const cryptoColumns: TableColumn[] = [
  { header: "#", key: "id" },
  {
    header: "Name",
    key: "name",
    cName: "text-center",
    customRender: (dataRow: DataRow): ReactNode => {
      return (
        <div className="flex flex-row justify-center gap-2">
          <div>
            <Image
              src={dataRow.image}
              alt="Crypto logo"
              width={24}
              height={24}
            />
          </div>

          <p>{dataRow.name}</p>
          <p>{dataRow.symbol}</p>
        </div>
      );
    },
  },
  {
    header: "24h %",
    key: "24h",
    cName: "text-right",
    customRender: (dataRow: DataRow): ReactNode => {
      return (
        <div className="flex flex-row justify-end gap-1">
          <i className="flex items-center text-6xl sm:text-sm">
            {dataRow["24h"] < 0
              ? GLOBAL_ICONS.caretDownSm
              : GLOBAL_ICONS.caretUpSm}
          </i>
          <p
            className={cn(
              "flex items-center",
              dataRow["24h"] < 0 ? "text-red-600" : "text-green-500",
            )}
          >
            {Math.abs(dataRow["24h"]).toFixed(2)}%
          </p>
        </div>
      );
    },
  },
  {
    header: "Price",
    key: "price",
    cName: "text-right",
    customRender: (dataRow: DataRow): ReactNode => {
      return (
        <>
          <div className="flex justify-end">
            <p
              className={cn(
                dataRow["24h"] < 0 ? "text-red-600" : "text-green-500",
              )}
            >
              ${dataRow.price}
            </p>
          </div>
        </>
      );
    },
  },
];

// Function to transform the data
const transformData = (data: ApiData[]): TransformedData[] => {
  return data
    .map((item) => ({
      id: item.market_cap_rank,
      name: item.name,
      symbol: item.symbol ? item.symbol.toUpperCase() : null,
      image: item.image ?? "",
      price: item.current_price,
      marketCap: item.market_cap,
      "24h": item.market_cap_change_percentage_24h,
    }))
    .sort((a, b) => a.id - b.id);
};

export default function HomeTable({ data }: { data: ApiData[] }) {
  return <Table columns={cryptoColumns} data={transformData(data)} />;
}
