import { Box, Drawer } from "@mui/material";
import { RouterConfigData } from "@dscl-ttg/types/app";
import React, { Fragment, useMemo } from "react";
import SidebarWrapper from "@ui/Layout/components/Sidebar/SidebarWrapper";
import VerticalNav from "@ui/Layout/components/VerticalNav";
import UserInfo from "@ui/Layout/components/UserInfo";

type SidebarProps = {
  open: boolean;
  toggleOpenClose: () => void;
  routesConfig: RouterConfigData[];
};
const Sidebar: React.FC<SidebarProps> = ({
  open,
  toggleOpenClose,
  routesConfig,
}) => {
  const SidebarWrapperMemo = useMemo(
    () => (
      <SidebarWrapper className="mini-toggle-sidebar">
        <UserInfo />
        <Box
          sx={{
            py: 2,
            height: "calc(100vh - 70px) !important",
            overflow: "auto",
          }}
        >
          <VerticalNav routesConfig={routesConfig} />
        </Box>
      </SidebarWrapper>
    ),
    [routesConfig],
  );

  return (
    <Fragment>
      <Drawer
        open={open}
        onClose={toggleOpenClose}
        style={{ position: "absolute" }}
        sx={{
          display: { xl: "none", xs: "block" },
        }}
      >
        {SidebarWrapperMemo}
      </Drawer>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        {SidebarWrapperMemo}
      </Box>
    </Fragment>
  );
};

export default Sidebar;
