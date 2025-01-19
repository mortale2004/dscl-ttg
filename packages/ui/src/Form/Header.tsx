import { Typography } from "@mui/material";
import { FONT_SIZE, FONTS } from "@dscl-ttg/constants";
import React, { memo, ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
  sx?: object;
};

const Header: React.FC<HeaderProps> = ({ children, sx }) => (
  <Typography
    component={"h3"}
    sx={{
      fontWeight: FONTS.BOLD,
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      color: "black",
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default memo(Header);
