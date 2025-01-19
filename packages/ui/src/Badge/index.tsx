import { Box } from "@mui/material";
import { FONTS } from "@dscl-ttg/constants";
import React, { memo } from "react";

type BadgeProps = {
  color?: string;
  count: number;
};

const Badge: React.FC<BadgeProps> = memo(
  ({ color = "primary.main", count }) => {
    return (
      <Box
        sx={{
          bgColor: color,
          padding: "0px 7px",
          fontSize: 11,
          fontWeight: FONTS.SEMI_BOLD,
          height: 20,
          minWidth: 20,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          color: (theme) => theme.palette.secondary.contrastText,
        }}
      >
        {count}
      </Box>
    );
  },
);

export default Badge;
