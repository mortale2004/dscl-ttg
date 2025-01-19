import React, { memo } from "react";
import ListItem from "@mui/material/ListItem";
import { alpha } from "@mui/material";
import { FONTS } from "@dscl-ttg/constants";

type VerticalNavGroupItemProps = {
  children: React.ReactNode;
  sidebarTextColor: string;
  level: number;
} & any;
const VerticalNavGroupItem: React.FC<VerticalNavGroupItemProps> = ({
  children,
  sidebarTextColor,
  level,
  ...rest
}) => {
  return (
    <ListItem
      sx={{
        height: 40,
        my: 0.25,
        pl: 31 + 33 * level + "px",
        pr: 3,
        color: alpha(sidebarTextColor, 0.7),
        fontWeight: FONTS.SEMI_BOLD,
        fontSize: 14,
        cursor: "pointer",
        textDecoration: "none!important",
        whiteSpace: "nowrap",
        transition: "all 0.4s ease",
        "&.nav-item-header": {
          cursor: "auto",
          transition: "all 0.4s ease",
        },
      }}
      {...rest}
    >
      {children}
    </ListItem>
  );
};

export default memo(VerticalNavGroupItem);
