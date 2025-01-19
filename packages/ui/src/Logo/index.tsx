import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import { settingsSelector } from "@dscl-ttg/store";
import { Link } from "react-router-dom";
import { FONTS, FONT_SIZE } from "@dscl-ttg/constants";
import { Box } from "@mui/material";
type LogoProps = {
  sx?: any;
};

const Logo: React.FC<LogoProps> = memo(({ sx }) => {
  const settings = useRecoilValue<any>(settingsSelector);
  return (
    <Link to={settings.initialURL}>
      <Box sx={sx ? { ...styles, ...sx } : styles} className="app-logo">
        DSCL TTG
      </Box>
    </Link>
  );
});

export default Logo;

const styles = {
  display: "flex",
  flexDirection: "row",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  fontSize: FONT_SIZE.HEADING_3,
  fontWeight: FONTS.BOLD,
  color: "primary.main",
  "& img": {
    height: "100%",
  },
};
