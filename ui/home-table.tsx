"use client";

import React, { ReactNode } from "react";
import Table, { DataRow, TableColumn } from "./generic/table";
import Image from "next/image";
import { cn } from "@/lib/utils";

const cryptoColumns: TableColumn[] = [
  { header: "#", key: "id" },
  {
    header: "Name",
    key: "name",
    customRender: (dataRow: DataRow): ReactNode => {
      return (
        <div className="flex flex-row gap-2">
          <Image src={dataRow.image} alt="Crypto logo" width={24} height={24} />

          <p>{dataRow.name}</p>
          <p>{dataRow.symbol}</p>
        </div>
      );
    },
  },
  {
    header: "24h %",
    key: "24h",
    customRender: (dataRow: DataRow): ReactNode => {
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
    customRender: (dataRow: DataRow): ReactNode => {
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

export default function HomeTable({ data }: { data: DataRow[] }) {
  return <Table columns={cryptoColumns} data={data} />;
}
