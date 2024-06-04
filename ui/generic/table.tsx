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
  data?: DataRow[];
  onRowClick?: () => void;
}

export default function Table({
  columns,
  data = [],
  isLoading = false,
  onRowClick = () => {},
}: TableProps): ReactNode {
  const renderTdData = (dataObj: DataRow) => {
    return (
      columns?.length > 0 &&
      columns.map((col) => {
        const mapKey = `${dataObj[col.key]}${col.key}`;
        if (col.customRender) {
          return <TDPadded key={mapKey}>{col.customRender(dataObj)}</TDPadded>;
        } else {
          return <TDPadded key={mapKey}>{dataObj[col.key]}</TDPadded>;
        }
      })
    );
  };

  return (
    <table className="w-full">
      <thead className="text-left text-sm text-white">
        <tr>
          {columns?.length > 0 &&
            columns.map(({ key, header }) => (
              <th className="p-3 sm:p-4" key={key}>
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
              onClick={onRowClick}
              key={dataObj.id}
            >
              {renderTdData(dataObj)}
            </tr>
          ))}
        {isLoading && generateLoadingCells(columns)}
      </tbody>
    </table>
  );
}

function generateLoadingCells(columns: TableColumn[]) {
  const loadingTd = [];
  for (let i = 0; i < 20; i++) {
    loadingTd.push(
      <tr>
        {columns?.length > 0 &&
          columns.map(({ key }) => <LoadingCell key={key} />)}
      </tr>,
    );
  }
  return loadingTd;
}

function LoadingCell() {
  return (
    <TDPadded cName="text-center">
      <div className="animate-pulse rounded-md bg-neutral-700 p-4"></div>
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
  return <td className={cn("p-3 sm:p-4", cName)}>{children}</td>;
}
