import {
  Grow,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import * as ReactDOM from "react-dom";
import { Manager, Popper, Reference } from "react-popper";
import { useLocation } from "react-router-dom";
import HorizontalGroup from "./HorizontalGroup";
import HorizontalItem from "./HorizontalItem";
import { RouterConfigData } from "@dscl-ttg/types/app";
import { useRecoilValue } from "recoil";
import { settingsSelector } from "@dscl-ttg/store";
import { isUrlInChildren } from "@dscl-ttg/frontend-utils";

import { Z_INDEX } from "@dscl-ttg/constants";

type HorizontalCollapseType = {
  item: RouterConfigData;
  nestedLevel: number;
};

const HorizontalCollapse: React.FC<HorizontalCollapseType> = ({
  item,
  nestedLevel,
}) => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const active = isUrlInChildren(item, location.pathname);

  const settings = useRecoilValue(settingsSelector);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } =
    settings.sidebar;

  const handleToggle = useCallback((open: boolean) => {
    setOpened(open);
  }, []);

  if (!item?.hasPermission) {
    return null;
  }

  return (
    <List
      sx={{
        py: 0,
        "& .list-item-text": {
          padding: "0 0 0 16px",
        },
      }}
      className="navbarNavSubmenu"
    >
      <Manager>
        <Reference>
          {({ ref }) => (
            <ListItem
              ref={ref}
              component={"button"}
              sx={{
                textTransform: "uppercase",
                padding: "0px 12px",
                "&.active, &.active:hover, &.active:focus": {
                  backgroundColor: sidebarMenuSelectedBgColor + "!important",
                  color: sidebarMenuSelectedTextColor + "!important",
                },
                ".svgIcon": {
                  color: (theme) => theme.palette.primary.main,
                },
                "&.open": {
                  backgroundColor: "rgba(0,0,0,.08)",
                },
                "&.dense": {
                  padding: "0px 12px",
                  "& .list-item-text": {
                    padding: "0 0 0 8px",
                  },
                },
              }}
              className={clsx(
                "navItemSubmenu",
                opened && "open",
                active && "active",
              )}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
              aria-haspopup={true}
            >
              {item.icon && (
                <Icon
                  sx={{
                    color: active ? sidebarMenuSelectedTextColor : "action",
                    mr: 3.5,
                    fontSize: { xs: 16, xl: 18 },
                  }}
                  className="svgIcon"
                >
                  {item.icon}
                </Icon>
              )}
              <ListItemText
                className="navLinkTextSubmenu"
                primary={item.title}
              />
              <Box p={0}>
                <IconButton disableRipple>
                  <Icon
                    sx={{
                      color: active ? sidebarMenuSelectedTextColor : "action",
                    }}
                  >
                    chevron_right
                  </Icon>
                </IconButton>
              </Box>
            </ListItem>
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper placement="right">
            {({ ref, style, placement }) =>
              opened && (
                <Box
                  ref={ref}
                  sx={{
                    boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.2)",
                    zIndex: Z_INDEX.HORIZONTAL_COLLAPSE,
                    ...style,
                    "& .popperClose": {
                      pointerEvents: "none",
                    },
                  }}
                  data-placement={placement}
                  className={clsx({
                    popperClose: !opened,
                  })}
                >
                  <Grow in={opened} id="menu-list-grow">
                    <Paper
                      onMouseEnter={() => handleToggle(true)}
                      onMouseLeave={() => handleToggle(false)}
                    >
                      {item.children && (
                        <List
                          sx={{
                            px: 0,
                          }}
                        >
                          {item.children.map((item) => (
                            <React.Fragment key={item?.title}>
                              {item.type === "group" && (
                                <HorizontalGroup
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                />
                              )}

                              {item.type === "collapse" && (
                                <HorizontalCollapse
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                />
                              )}

                              {item.type === "item" && (
                                <HorizontalItem item={item} />
                              )}
                            </React.Fragment>
                          ))}
                        </List>
                      )}
                    </Paper>
                  </Grow>
                </Box>
              )
            }
          </Popper>,
          document.querySelector("#root") as any,
        )}
      </Manager>
    </List>
  );
};

export default React.memo(HorizontalCollapse);
