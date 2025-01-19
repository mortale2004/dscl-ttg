import { Icon, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import clsx from "clsx";
import React, { useMemo } from "react";
import VerticalNavItem from "./VerticalNavItem";
import { RouterConfigData } from "@dscl-ttg/types/app";
import NavLink from "@ui/NavLink";
import Badge from "@ui/Badge";
import { useLocation } from "react-router-dom";
type VerticalItemProps = {
  level: number;
  item: RouterConfigData & { hasPermission?: boolean };
};

const VerticalItem: React.FC<VerticalItemProps> = ({ level, item }) => {
  const { pathname } = useLocation();

  const pathFromArray = useMemo(() => {
    setTimeout(() => {
      document
        .getElementById(pathname)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1);
    return item.path?.find((path) => path === pathname) || item.path?.[0];
  }, [item.path, pathname]);
  if (!item?.hasPermission) {
    return null;
  }

  return (
    <VerticalNavItem
      level={level}
      component={NavLink}
      to={pathFromArray}
      activeClassName="active"
    >
      {item.icon && (
        <Box component="span">
          <Icon
            sx={{
              fontSize: 18,
              display: "block",
              mr: 4,
            }}
            className={clsx("nav-item-icon", "material-icons-outlined")}
            color="action"
          >
            {item.icon}
          </Icon>
        </Box>
      )}
      <ListItemText
        className="nav-item-content"
        primary={item.title}
        classes={{ primary: "nav-item-text" }}
      />
      {item.count && (
        <Box sx={{ mr: 3.5 }} className="menu-badge">
          <Badge count={item.count} color={item.color} />
        </Box>
      )}
    </VerticalNavItem>
  );
};

export default React.memo(VerticalItem);
