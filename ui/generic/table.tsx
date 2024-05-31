"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export interface TableColumn {
  header: string;
  key: string;
  customRender?: (dataRow: DataRow) => ReactNode;
}

export interface DataRow {
  [key: string]: any;
}

interface TableProps {
  isLoading?: boolean;
  columns: TableColumn[];
  data: DataRow[];
  onRowClick?: () => void;
}

export default function Table({
  columns,
  data,
  isLoading = false,
  onRowClick = () => {},
}: TableProps): ReactNode {
  const renderTdData = (dataObj: DataRow) => {
    return (
      columns?.length > 0 &&
      columns.map((col) => {
        const mapKey = `${dataObj[col.key]}${col.key}`;

        if (isLoading) {
          return <LoadingCell key={mapKey} />;
        } else if (col.customRender) {
          return <TDPadded key={mapKey}>{col.customRender(dataObj)}</TDPadded>;
        } else {
          return <TDPadded key={mapKey}>{dataObj[col.key]}</TDPadded>;
        }
      })
    );
  };

  return (
    <table className="w-full ">
      <thead className="text-left text-sm text-white">
        <tr>
          {columns?.length > 0 &&
            columns.map(({ key, header }) => (
              <th className="p-4" key={key}>
                {header}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 &&
          data.map((dataObj) => (
            <tr
              className="hover:cursor-pointer hover:bg-neutral-900"
              onClick={onRowClick}
              key={dataObj.id}
            >
              {renderTdData(dataObj)}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function LoadingCell() {
  return (
    <TDPadded cName="py-2 text-center">
      <div className="h-4 animate-pulse rounded-md bg-gray-200"></div>
    </TDPadded>
  );
}

function TDPadded({
  children,
  cName,
}: {
  children: ReactNode;
  cName?: string;
}) {
  return <td className={cn("p-4", cName)}>{children}</td>;
}
