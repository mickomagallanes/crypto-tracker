"use client";
import { cn } from "@/lib/utils";
import { DataRow, TableColumn } from "@/types/table";
import React, { ReactNode } from "react";

export default function Table({
  columns,
  data = [],
  onRowClick = () => {},
}: {
  columns: TableColumn[];
  data?: DataRow[];
  onRowClick?: (dataRow: DataRow) => void;
}): ReactNode {
  const renderTdData = (dataObj: DataRow) => {
    return (
      columns?.length > 0 &&
      columns.map((col) => {
        const mapKey = `${dataObj[col.key]}${col.key}`;
        if (col.customRender) {
          return (
            <TDPadded cName={col.cName} key={mapKey}>
              {col.customRender(dataObj)}
            </TDPadded>
          );
        } else {
          return (
            <TDPadded cName={col.cName} key={mapKey}>
              {dataObj[col.key]}
            </TDPadded>
          );
        }
      })
    );
  };

  return (
    <table className="w-full">
      <thead className="text-left text-sm text-white">
        <tr>
          {columns?.length > 0 &&
            columns.map(({ key, header, cName }) => (
              <th className={cn("p-3 sm:p-4", cName)} key={key}>
                {header}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="text-xs sm:text-sm">
        {data?.length > 0 &&
          data.map((dataObj) => (
            <tr
              className="hover:cursor-pointer hover:bg-neutral-900"
              onClick={() => onRowClick(dataObj)}
              key={dataObj.id}
            >
              {renderTdData(dataObj)}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function TDPadded({
  children,
  cName = "",
}: {
  children: ReactNode;
  cName?: string;
}) {
  return <td className={cn("p-2 sm:p-4", cName)}>{children}</td>;
}
