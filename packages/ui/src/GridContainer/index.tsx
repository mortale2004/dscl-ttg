import { Grid } from "@mui/material";
import React, { memo } from "react";

type GridContainerProps = {
  children: React.ReactNode;
} & any;

const GridContainer: React.FC<GridContainerProps> = memo(
  ({ children, ...rest }) => {
    return (
      <Grid
        container
        spacing={1}
        {...rest}
        sx={{
          my: 0.2,
          ...rest.sx,
        }}
      >
        {children}
      </Grid>
    );
  },
);

export default GridContainer;
