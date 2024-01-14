import "react-data-grid/lib/styles.css";

import { FC } from "react";
import DataGrid, { ColumnOrColumnGroup } from "react-data-grid";

export const Table: FC<{
  columns: ColumnOrColumnGroup<
    {
      [key: string]: any;
    },
    unknown
  >[];
  rows: { [key: string]: any }[];
}> = ({ columns, rows }) => {
  return <DataGrid style={{ borderRadius: 8 }} columns={columns} rows={rows} />;
};
