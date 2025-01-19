import { Grid } from "@mui/material";
import React, { memo, ReactNode } from "react";

type GridItemProps = {
  children: ReactNode;
  sx?: object;
} & any;

const GridItem: React.FC<GridItemProps> = memo(({ children, sx, ...rest }) => {
  return (
    <Grid item xs={12} {...rest} sx={sx}>
      {children}
    </Grid>
  );
});

export default GridItem;
