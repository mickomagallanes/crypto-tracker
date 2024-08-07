"use client";

import React, { ReactNode } from "react";
import Table from "../ui/table";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GLOBAL_ICONS from "@/lib/icons";
import { useRouter } from "next/navigation";
import { DataRow, TableColumn } from "@/types/table";

const cryptoColumns: TableColumn[] = [
  { header: "#", key: "id" },
  {
    header: "Name",
    key: "name",
    cName: "sm:text-center",
    customRender: (dataRow: DataRow): ReactNode => {
      return (
        <div className="flex flex-row gap-2 sm:justify-center">
          <div>
            <Image
              src={dataRow.image}
              alt="Crypto logo"
              width={24}
              height={24}
            />
          </div>

          <p>{dataRow.name}</p>
          <p className="hidden sm:block">{dataRow.symbol}</p>
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
const transformData = (data: APIMarketData): TransformedMarket[] => {
  return data
    .map((item) => ({
      id: item.market_cap_rank,
      coinId: item.id,
      name: item.name,
      symbol: item.symbol ? item.symbol.toUpperCase() : null,
      image: item.image ?? "",
      price: item.current_price,
      marketCap: item.market_cap,
      "24h": item.market_cap_change_percentage_24h,
    }))
    .sort((a, b) => a.id - b.id);
};

export default function HomeTable({ data }: { data: APIMarketData }) {
  const router = useRouter();

  return (
    <Table
      onRowClick={(dataRow) => router.push("/" + dataRow.coinId)}
      columns={cryptoColumns}
      data={transformData(data)}
    />
  );
}
