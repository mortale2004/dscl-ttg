import React, { memo } from "react";
import { Icon, ListItem, ListItemText } from "@mui/material";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { RouterConfigData } from "@dscl-ttg/types/app";
import { useRecoilValue } from "recoil";
import { settingsSelector } from "@dscl-ttg/store";
import { FONTS } from "@dscl-ttg/constants";
import { isUrlInChildren } from "@dscl-ttg/frontend-utils";
import NavLink from "@ui/NavLink";
import Badge from "@ui/Badge";

type HorizontalItemType = {
  item: RouterConfigData;
};

const HorizontalItem: React.FC<HorizontalItemType> = memo(({ item }) => {
  const location = useLocation();
  const active = isUrlInChildren(item, location.pathname);
  const setting = useRecoilValue(settingsSelector);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } =
    setting.sidebar;

  if (!item?.hasPermission) {
    return null;
  }

  return (
    <ListItem
      component={NavLink as React.ElementType}
      to={item.path?.[0]}
      activeClassName="active"
      className={clsx("navItem")}
      sx={{
        textTransform: "uppercase",
        minHeight: 40,
        span: {
          fontSize: 16,
          fontWeight: FONTS.BOLD,
        },
        padding: "4px 12px",
        fontWeight: "bold !important",
        color: (theme) => theme.palette.text.primary,
        textDecoration: "none!important",
        ".svgIcon": {
          color: (theme) => theme.palette.primary.main,
          fontSize: 24,
        },
        "&.active": {
          backgroundColor: sidebarMenuSelectedBgColor,
          color: sidebarMenuSelectedTextColor + "!important",
          pointerEvents: "none",
          "& .list-item-text-primary": {
            color: "inherit",
          },
          "& .list-item-icon": {
            color: "inherit",
          },
          ".svgIcon": {
            color: "inherit",
          },
        },
        "& .list-item-text": {
          padding: "0 0 0 16px",
        },
        "&.dense": {
          padding: "4px 12px",
          minHeight: 40,
          "& .list-item-text": {
            padding: "0 0 0 8px",
          },
        },
      }}
    >
      {item.icon && (
        <Icon
          sx={{
            color: active ? sidebarMenuSelectedTextColor : "action",
            mr: 3,
            fontSize: { xs: 16, xl: 18 },
          }}
          className="svgIcon"
        >
          {item.icon}
        </Icon>
      )}
      <ListItemText className="NavLinkTextSubmenu" primary={item.title} />
      {item.count && (
        <Box ml={4}>
          <Badge count={item.count} color={item.color} />
        </Box>
      )}
    </ListItem>
  );
});

export default React.memo(HorizontalItem);
