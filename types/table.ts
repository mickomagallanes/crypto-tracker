import { ReactNode } from "react";

export interface DataRow {
  [key: string]: any;
}

export interface TableColumn {
  header: string;
  key: string;
  cName?: string;
  customRender?: (dataRow: DataRow) => ReactNode;
}
