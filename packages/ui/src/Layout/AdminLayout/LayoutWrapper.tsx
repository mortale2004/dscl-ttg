import React, { memo } from "react";
import { Box } from "@mui/material";
import { Z_INDEX } from "@dscl-ttg/constants";

type LayoutWrapperProps = {
  children: React.ReactNode;
  rest?: any;
  className?: string;
};
const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Box
      className={className}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        backgroundColor: (theme) => theme.palette.background.default,
        "& .mainContent": {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: { xs: "100%", lg: "calc(100% - 280px)" },
          transition: "all 0.5s ease",
          ml: { lg: "280px" },
        },
        "&.mini-sidebar-collapsed": {
          "& .mainContent": {
            width: { lg: "calc(100% - 64px)" },
            ml: { lg: "64px" },
          },
          "& .mini-toggle-sidebar:not(:hover)": {
            width: { lg: 64 },
            "& .user-info, & .nav-item-header, & .nav-item-content, & .menu-badge, & .collapse-children, & .nav-item-icon-arrow-btn":
              {
                display: "none",
              },
            "& .nav-item-icon": {
              mr: 0,
              ml: 0.5,
            },
          },
          "&.appMainFixedHeader .app-bar": {
            width: { lg: "calc(100% - 64px)" },
          },
          "& .menu-vertical-item": {
            pl: 3,
            "&.rounded-menu": {
              mx: 2,
              pl: 3,
              borderRadius: 1,
            },
            "&.rounded-reverse": {
              mx: 2,
              pl: 3,
              borderRadius: 1,
            },
            "&.standard-menu": {
              mx: 2,
              width: "calc(100% - 16px)",
              pl: 3,
              borderRadius: 1,
              "&.active:after": {
                backgroundColor: "transparent",
              },
            },
            "&.curved-menu": {
              mx: 2,
              borderRadius: 1,
              "&:before, &:after": {
                display: "none",
              },
            },
          },
          "& .menu-vertical-collapse": {
            pl: 3,
            mx: 2,
            width: "calc(100% - 16px)",
          },
        },
        "&.appMainFixedFooter": {
          pb: { xs: 12, xl: 14.5 },
        },
        "&.appMainFixedHeader": {
          pt: { xs: "50px", sm: "50px" },
          "& .app-bar": {
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: Z_INDEX.HEADER,
            width: {
              xs: "100%",
              lg: "calc(100% - 280px)",
            },
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default memo(LayoutWrapper);
