import React, { ReactNode, useState } from "react";

export interface TableColumn {
  header: string;
  key: string;
  customRender?: (dataRow: DataRow) => ReactNode;
}

interface DataRow {
  [key: string]: any;
}

interface TableProps {
  isLoading?: boolean;
  columns: TableColumn[];
  data: DataRow[];
}

export default function Table({
  columns,
  data,
  isLoading = false,
}: TableProps): ReactNode {
  const renderTdData = (dataObj: DataRow) => {
    return (
      columns?.length > 0 &&
      columns.map((col) => {
        const mapKey = `${dataObj[col.key]}${col.key}`;

        if (isLoading) {
          return <LoadingCell key={mapKey} />;
        } else if (col.customRender) {
          return <td key={mapKey}>{col.customRender(dataObj)}</td>;
        } else {
          return <td key={mapKey}>{dataObj[col.key]}</td>;
        }
      })
    );
  };

  return (
    <table className="w-full border-separate border-spacing-7">
      <thead className="text-left text-sm text-white">
        <tr>
          {columns?.length > 0 &&
            columns.map(({ key, header }) => <th key={key}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 &&
          data.map((dataObj) => (
            <tr key={dataObj.id}>{renderTdData(dataObj)} </tr>
          ))}
      </tbody>
    </table>
  );
}

function LoadingCell() {
  return (
    <td className="py-2 text-center">
      <div className="h-4 animate-pulse rounded-md bg-gray-200"></div>
    </td>
  );
}
