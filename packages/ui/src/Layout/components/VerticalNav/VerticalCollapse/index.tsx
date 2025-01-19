import { Collapse, Icon, IconButton, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VerticalCollapseItem from "./VerticalCollapseItem";
import { RouterConfigData } from "@dscl-ttg/types/app";
import { useRecoilValue } from "recoil";
import { settingsSelector } from "@dscl-ttg/store";
import VerticalItem from "../VerticalItem";

const needsToBeOpened = (pathname: string, item: RouterConfigData) => {
  return pathname ? isUrlInChildren(item, pathname) : false;
};

const isUrlInChildren = (parent: RouterConfigData, path: string) => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], path)) {
        return true;
      }
    }

    if (parent.children[i]?.path?.includes(path)) {
      return true;
    }
  }

  return false;
};
type VerticalCollapseProps = {
  item: RouterConfigData;
  level: number;
};
const VerticalCollapse: React.FC<VerticalCollapseProps> = ({ item, level }) => {
  const settings = useRecoilValue<any>(settingsSelector);
  const { pathname } = useLocation();
  const [open, setOpen] = useState<boolean>(() =>
    needsToBeOpened(pathname, item),
  );

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pathname, item]);

  const handleClick = () => {
    setOpen(!open);
  };

  if (!item?.hasPermission) {
    return null;
  }

  return (
    <>
      <VerticalCollapseItem
        level={level}
        sidebarTextColor={settings?.sidebar?.sidebarTextColor}
        component="div"
        className={clsx("menu-vertical-collapse", open && "open")}
        onClick={handleClick}
      >
        {item.icon && (
          <Box component="span">
            <Icon
              sx={{ mr: 4 }}
              color="action"
              className={clsx("nav-item-icon")}
            >
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
            mt: -0.2,
          }}
          className="nav-item-content"
          classes={{ primary: clsx("nav-item-text") }}
          primary={item.title}
        />
        <IconButton
          className="nav-item-icon-arrow-btn"
          sx={{ p: 0, mr: 0.75 }}
          disableRipple
          size="large"
        >
          <Icon className="nav-item-icon-arrow" color="inherit">
            {open ? "expand_more" : "chevron_right"}
          </Icon>
        </IconButton>
      </VerticalCollapseItem>

      {item.children && (
        <Collapse in={open} className="collapse-children">
          {item.children.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === "collapse" && (
                <VerticalCollapse item={item} level={level + 1} />
              )}

              {item.type === "item" && (
                <VerticalItem item={item} level={level + 1} />
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default React.memo(VerticalCollapse);
