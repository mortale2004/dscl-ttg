import React, { memo } from "react";
import {
  Table as MuiTable,
  TableProps as MuiTableProps,
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { formatField } from "@dscl-ttg/frontend-utils";

type TableProps = {} & MuiTableProps &
  TableHeadProps &
  Omit<TableBodyProps, "item">;

const defaultStyles = {
  "& td, & th": {
    py: 1,
  },
};

const Table: React.FC<TableProps> = memo(
  ({ tableBodyKeys, tableHeaders, data, rowKey, ...rest }) => {
    return (
      <TableContainer sx={defaultStyles}>
        <MuiTable {...rest} stickyHeader>
          {tableHeaders && tableHeaders.length > 0 && (
            <TableHead tableHeaders={tableHeaders} />
          )}
          <TableBody rowKey={rowKey} tableBodyKeys={tableBodyKeys} data={data} />
        </MuiTable>
      </TableContainer>
    );
  }
);

export default Table;

type TableHeadProps = {
  tableHeaders?: (string | Function)[];
} & MuiTableHeadProps;

const TableHead: React.FC<TableHeadProps> = memo(({ tableHeaders = [] }) => {
  return (
    <MuiTableHead>
      <TableRow>
        {tableHeaders.map((header, index) => (
          <TableCell key={index}>
            {typeof header === "function" ? header(index) : header}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
});

type TableBodyProps = {
  tableBodyKeys: (string | Function)[];
  data: any[];
  rowKey?: string;
} & MuiTableBodyProps;

const TableBody: React.FC<TableBodyProps> = memo(({ data, tableBodyKeys, rowKey="_index" }) => {
  return (
    <MuiTableBody>
      {data.map((item, index) => (
        <TableBodyRow key={rowKey === "_index" ? index : item[rowKey]} item={item} rowIndex={index} tableBodyKeys={tableBodyKeys} />
      ))}
    </MuiTableBody>
  );
});

type TableBodyRowProps = {
  tableBodyKeys: (string | Function)[];
  item: any;
  rowIndex:number;
};

const TableBodyRow: React.FC<TableBodyRowProps> = memo(
  ({ item, tableBodyKeys, rowIndex }) => {
    return (
      <TableRow>
        {tableBodyKeys.map((key, index) => (
          <TableCell key={index}>
            {typeof key === "function" ? key(item, rowIndex) : formatField(item, key)}
          </TableCell>
        ))}
      </TableRow>
    );
  }
);
