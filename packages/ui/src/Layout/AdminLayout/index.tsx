import React, { memo, useCallback, useState } from "react";
import LayoutContainer from "./LayoutContainer";
import type { RouterConfigData } from "@dscl-ttg/types/app";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

import Header from "./Header";
import LayoutWrapper from "./LayoutWrapper";
import ContentView from "../components/ContentView";

type AdminLayoutProps = {
  Router: React.ReactElement;
  routesConfig: RouterConfigData[];
  routes: any[];
};

const AdminLayout: React.FC<AdminLayoutProps> = memo(
  ({ routes, Router, routesConfig }) => {
    const [open, setOpen] = useState(true);

    const toggleOpenClose = useCallback(() => {
      setOpen((prev) => !prev);
    }, [setOpen]);

    return (
      <LayoutContainer>
        <LayoutWrapper
          className={clsx("adminLayoutContainer", {
            "mini-sidebar-collapsed": !open,
          })}
        >
          <Sidebar
            routesConfig={routesConfig}
            open={open}
            toggleOpenClose={toggleOpenClose}
          />
          <Box className="mainContent">
            <Header toggleOpenClose={toggleOpenClose} dynamicRoutes={routes} />
            <ContentView>{Router}</ContentView>
          </Box>
        </LayoutWrapper>
      </LayoutContainer>
    );
  },
);

export default AdminLayout;
