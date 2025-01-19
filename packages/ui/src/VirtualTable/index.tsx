import React, { memo } from "react";
import { TableProps, TableVirtuoso, TableVirtuosoProps } from "react-virtuoso";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material/";
type VirtualTableProps = {
  data: any[];
} & TableVirtuosoProps<any, any>;

const VirtualTable: React.FC<VirtualTableProps> = memo(
  ({ data, fixedHeaderContent, itemContent, ...rest }) => {
    return (
      <TableVirtuoso
        data={data}
        components={TableComponents as any}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={itemContent}
        {...rest}
      />
    );
  },
);

export default VirtualTable;

const TableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref as any} />
  )),
  Table: (props: TableProps) => (
    <Table {...props} style={{ borderCollapse: "separate" }} />
  ),
  TableHead: TableHead,
  TableRow: TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...(props as any)} ref={ref} />
  )),
};
