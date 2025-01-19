import React, { useCallback, useState } from "react";
import {
  Grow,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import clsx from "clsx";
import { Manager, Popper, Reference } from "react-popper";
import * as ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

import HorizontalCollapse from "./HorizontalCollapse";
import HorizontalItem from "./HorizontalItem";
import { FONTS, Z_INDEX } from "@dscl-ttg/constants";
import { RouterConfigData } from "@dscl-ttg/types/app";
import { isUrlInChildren } from "@dscl-ttg/frontend-utils";

type HorizontalGroupProps = {
  item: RouterConfigData;
  nestedLevel: number;
};
const HorizontalGroup: React.FC<HorizontalGroupProps> = ({
  item,
  nestedLevel,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const location = useLocation();

  const handleToggle = useCallback((open: boolean) => {
    setOpened(open);
  }, []);

  if (!item?.hasPermission) {
    return null;
  }
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <ListItem
            ref={ref}
            className={clsx(
              "navItem",
              isUrlInChildren(item, location.pathname) && "active",
            )}
            sx={{
              textTransform: "uppercase",
            }}
            onMouseEnter={() => handleToggle(true)}
            onMouseLeave={() => handleToggle(false)}
          >
            {item.icon && (
              <Icon color="action" className="navLinkIcon">
                {item.icon}
              </Icon>
            )}
            <ListItemText
              primary={item.title}
              sx={{
                span: {
                  fontWeight: FONTS.BOLD,
                },
              }}
            />
            {nestedLevel > 0 && (
              <IconButton
                sx={{
                  ml: 2,
                }}
                disableRipple
              >
                <Icon
                  sx={{
                    fontSize: 18,
                  }}
                  className="arrow-icon"
                >
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            )}
          </ListItem>
        )}
      </Reference>
      {ReactDOM.createPortal(
        <Popper placement={nestedLevel === 0 ? "bottom-start" : "right"}>
          {({ ref, style, placement }: any) =>
            opened && (
              <Box
                ref={ref}
                sx={{
                  ...style,
                  boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.2)",
                  zIndex: Z_INDEX.HORIZONTAL_GROUP,
                  "& .popperClose": {
                    pointerEvents: "none",
                  },
                }}
                data-placement={placement}
                className={clsx({
                  popperClose: !opened,
                })}
              >
                <Grow
                  in={opened}
                  id="menu-list-grow"
                  style={{ transformOrigin: "0 0 0" }}
                >
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
                        {item.children.map((item, index) => (
                          <React.Fragment key={index}>
                            {item.type === "group" && (
                              <HorizontalGroup
                                item={item}
                                nestedLevel={nestedLevel}
                              />
                            )}

                            {item.type === "collapse" && (
                              <HorizontalCollapse
                                item={item}
                                nestedLevel={nestedLevel}
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
  );
};
export default React.memo(HorizontalGroup);
