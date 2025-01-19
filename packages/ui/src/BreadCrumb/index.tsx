import { Box, Breadcrumbs, useTheme } from "@mui/material";
import { FONTS } from "@dscl-ttg/constants";
import React, { memo } from "react";
import { Link } from "react-router-dom";

type BreadCrumbProps = {
  navigations: {
    path: string;
    label: string;
  }[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = memo(({ navigations }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        a: {
          fontWeight: FONTS.BOLD,
          color: "secondary.main",
          fontSize: 16,
        },
        backgroundColor: (theme) => theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ maxWidth: 1020, width: "100%" }}
      >
        {navigations.map((nav, index) => (
          <Link
            key={index}
            color={
              navigations?.length === index + 1 ? "text.primary" : "inherit"
            }
            to={nav?.path}
          >
            {nav?.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
});

export default BreadCrumb;
