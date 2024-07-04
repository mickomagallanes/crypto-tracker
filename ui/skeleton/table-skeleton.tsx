import { cn } from "@/lib/utils";
import { TableColumn } from "@/types/table";
import React from "react";

export default function TableSkeleton({ columns }: { columns: TableColumn[] }) {
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
  for (let i = 0; i < 10; i++) {
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
      <div className="animate-pulse rounded-md bg-neutral-700 p-3"></div>
    </td>
  );
}
