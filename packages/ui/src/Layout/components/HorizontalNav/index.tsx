import React from "react";
import HorizontalGroup from "./HorizontalGroup";
import HorizontalCollapse from "./HorizontalCollapse";
import HorizontalItem from "./HorizontalItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { RouterConfigData } from "@dscl-ttg/types/app";

type HorizontalNavType = {
  routesConfig: RouterConfigData[];
};

const HorizontalNav: React.FC<HorizontalNavType> = ({ routesConfig }) => {
  return (
    <List className="navbarNav">
      {routesConfig.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === "group" && (
            <HorizontalGroup item={item} nestedLevel={0} />
          )}

          {item.type === "collapse" && (
            <HorizontalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === "item" && <HorizontalItem item={item} />}

          {item.type === "divider" && <Divider sx={{ my: 5 }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HorizontalNav;
