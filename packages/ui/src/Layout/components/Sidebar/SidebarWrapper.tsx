import { Box } from "@mui/material";
import { Z_INDEX } from "@dscl-ttg/constants";
import { settingsSelector } from "@dscl-ttg/store";
import React, { memo } from "react";
import { useRecoilValue } from "recoil";

type SidebarWrapperProps = {
  children: React.ReactNode;
  rest?: any;
  className?: string;
};

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
  children,
  className,
  ...rest
}) => {
  const settings = useRecoilValue(settingsSelector);
  const { sidebarBgColor, sidebarTextColor } = settings.sidebar;
  return (
    <Box
      className={className}
      sx={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.5s ease",
        position: { xs: "relative", lg: "fixed" },
        top: 0,
        left: 0,
        zIndex: Z_INDEX.SIDEBAR_WRAPPER,
        "& .app-sidebar": {
          position: "relative",
          top: "auto",
          left: "auto",
          width: "100%",
        },
      }}
      {...rest}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          backgroundColor: sidebarBgColor,
          color: sidebarTextColor,
          "& > *": {
            position: "relative",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default memo(SidebarWrapper);
