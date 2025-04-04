import React, { memo } from "react";
import { Box } from "@mui/material";

type LayoutContainerProps = {
  children: React.ReactNode;
  rest?: any;
  className?: string;
};
const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Box
      className={className}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: (theme) => theme.palette.background.default,
        "&.boxedLayout": {
          maxWidth: { xl: 1480 },
          mx: { xl: "auto" },
          boxShadow: "none",
          borderLeft: "1px solid #e8e5dd",
          borderRight: "1px solid #e8e5dd",
          "& .mini-toggle-sidebar": {
            position: { xl: "sticky" },
            height: { xl: "100%" },
            "& [data-simplebar]": {
              height: { xl: "calc(100vh - 70px) !important" },
            },
          },
          "& .mini-sidebar-collapsed": {
            "&.appMainFixedHeader": {
              "& .app-bar": {
                width: { xl: "100%" },
              },
            },
            "& .mainContent": {
              width: { xl: "100%" },
              ml: { xl: 0 },
            },
          },
          "& .appMainFixedHeader": {
            pt: { xl: 0 },
            "& .app-bar": {
              position: { xl: "sticky" },
              width: { xl: "100%" },
            },
          },
          "& .mainContent": {
            position: { xl: "static" },
            ml: { xl: 0 },
          },
          "& .fixed-footer": {
            position: { xl: "sticky" },
          },
          "& .appMainFixedFooter": {
            pb: { xl: 0 },
          },
        },
        "&.framedLayout": {
          padding: { xl: 5 },
          backgroundColor: (theme) => theme.palette.primary.main,

          "& .adminLayoutContainer": {
            borderRadius: { xl: 3 },
          },

          "& .mini-toggle-sidebar": {
            position: { xl: "sticky" },
            height: { xl: "100%" },
            borderTopLeftRadius: { xl: 12 },
            borderBottomLeftRadius: { xl: 12 },
            overflow: { xl: "hidden" },
            "& [data-simplebar]": {
              height: { xl: "calc(100vh - 70px) !important" },
            },
          },
          "& .app-bar": {
            borderTopRightRadius: { xl: 12 },
          },
          "& .footer": {
            borderBottomRightRadius: { xl: 12 },
          },
          "& .mini-sidebar-collapsed": {
            "&.appMainFixedHeader": {
              "& .app-bar": {
                width: { xl: "100%" },
              },
            },
            "& .mainContent": {
              width: { xl: "100%" },
              ml: { xl: 0 },
            },
          },
          "& .appMainFixedHeader": {
            pt: { xl: 0 },
            "& .app-bar": {
              position: { xl: "sticky" },
              width: { xl: "100%" },
            },
          },
          "& .mainContent": {
            position: { xl: "static" },
            ml: { xl: 0 },
          },
          "& .fixed-footer": {
            position: { xl: "sticky" },
          },
          "& .appMainFixedFooter": {
            pb: { xl: 0 },
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default memo(LayoutContainer);
