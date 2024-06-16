import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface DataRow {
  [key: string]: any;
}

interface TableColumn {
  header: string;
  key: string;
  cName?: string;
  customRender?: (dataRow: DataRow) => ReactNode;
}

export default function TableLoading({ columns }: { columns: TableColumn[] }) {
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
        {generateLoadingCells(columns)}
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
    <td className={cn("p-2 sm:p-4", "text-center")}>
      <div className="animate-pulse rounded-md bg-neutral-700 p-4"></div>
    </td>
  );
}
