import ListItem from "@mui/material/ListItem";
import { alpha } from "@mui/material";
import { FONTS, Z_INDEX } from "@dscl-ttg/constants";
import React from "react";

type VerticalCollapseItemProps = {
  children: React.ReactNode;
  sidebarTextColor: string;
} & any;
const VerticalCollapseItem: React.FC<VerticalCollapseItemProps> = ({
  children,
  sidebarTextColor,
  ...rest
}) => {
  return (
    <ListItem
      sx={{
        height: 40,
        my: 0.25,
        pl: "31px",
        pr: 3.75,
        whiteSpace: "nowrap",
        transition: "all 0.4s ease",
        "& .nav-item-text": {
          fontWeight: FONTS.MEDIUM,
          color: alpha(sidebarTextColor, 0.7),
        },

        "& .nav-item-icon": {
          color: alpha(sidebarTextColor, 0.7),
          "& svg": {
            fontSize: 20,
          },
        },

        "& .nav-item-icon-arrow": {
          color: alpha(sidebarTextColor, 0.7),
        },

        "& .MuiIconButton-root": {
          mr: 3,
          padding: 0,
        },

        "& .MuiTouchRipple-root": {
          // zIndex: 10,
          zIndex: Z_INDEX.VERTICAL_COLLAPSE_ITEM,
        },

        "&.open, &:hover, &:focus": {
          "& .nav-item-text": {
            fontWeight: FONTS.MEDIUM,
            color: sidebarTextColor,
          },

          "& .nav-item-icon": {
            color: sidebarTextColor,
          },

          "& .nav-item-icon-arrow": {
            color: sidebarTextColor,
          },
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      {...rest}
    >
      {children}
    </ListItem>
  );
};

export default React.memo(VerticalCollapseItem);
