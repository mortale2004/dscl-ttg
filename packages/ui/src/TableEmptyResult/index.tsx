import { Box, useTheme } from "@mui/material";
import React, { memo } from "react";
// @ts-ignore
import { NoDataFoundSvg } from "@dscl-ttg/assets";
type TableEmptyResultProps = {};

const TableEmptyResult: React.FC<TableEmptyResultProps> = memo(({}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexDirection: "column",
        minHeight: "300px",
        height: "100%",
        flex: 1,
        display: "flex",
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        border: 1,
        borderColor: "transparent",
        borderRadius: "4px",
        textAlign: "center",
        maxHeight: "70vh",
        img: {
          height: "80%",
          width: "80%",
          objectFit: "contain",
        },
      }}
    >
      <NoDataFoundSvg fill={theme.palette.primary.main} />
    </Box>
  );
});

export default TableEmptyResult;
