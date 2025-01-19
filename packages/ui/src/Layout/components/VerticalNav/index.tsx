import React, { memo } from "react";
import List from "@mui/material/List";
import { RouterConfigData } from "@dscl-ttg/types/app";
import VerticalCollapse from "./VerticalCollapse";
import VerticalItem from "./VerticalItem";
import NavVerticalGroup from "./VerticalNavGroup";
type VerticalNavProps = {
  routesConfig: RouterConfigData[];
};
const VerticalNav: React.FC<VerticalNavProps> = ({ routesConfig }) => {
  return (
    <List
      sx={{
        position: "relative",
        padding: 0,
      }}
      component="div"
    >
      {routesConfig.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === "group" && <NavVerticalGroup item={item} level={0} />}

          {item.type === "collapse" && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type === "item" && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default memo(VerticalNav);
