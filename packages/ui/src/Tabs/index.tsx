import React, { Fragment, memo, ReactNode, useCallback, useMemo } from "react";
import MuiTabs from "@mui/material/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab } from "@mui/material";
import { authAtom } from "@dscl-ttg/store";
import { useRecoilValue } from "recoil";
import { isRoutePermitted } from "@dscl-ttg/frontend-utils";

export type TabType = {
  label: string;
  path: string;
  component: ReactNode;
};

export type TabsProps = {
  tabs: TabType[];
};

const Tabs: React.FC<TabsProps> = memo(({ tabs }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  const permittedTabs = useMemo(
    () => tabs?.filter((tab) => isRoutePermitted(auth, tab.path)),
    [auth, tabs],
  );

  const value = useMemo(
    () => permittedTabs?.findIndex((tab) => tab.path === pathname),
    [permittedTabs, pathname],
  );

  return (
    <Fragment>
      <MuiTabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        role="navigation"
        aria-label="Tabs"
        TabIndicatorProps={{
          sx: {
            height: "4px",
          },
        }}
        sx={{
          "& button": {
            borderRight: (theme) => `1px solid ${theme.palette.primary.main}`,
            borderRadius: "unset",
            paddingTop: "5px",
            marginTop: "5px",
            padding: "0 15px",
            minHeight: "25px",
          },
          minHeight: "unset",
          height: "40px",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {permittedTabs?.map((tab, index) => (
          <Tab
            onClick={() => navigate(tab.path)}
            key={index}
            label={tab.label}
            value={index}
          />
        ))}
      </MuiTabs>
      {permittedTabs?.[value]?.component}
    </Fragment>
  );
});

export default Tabs;
