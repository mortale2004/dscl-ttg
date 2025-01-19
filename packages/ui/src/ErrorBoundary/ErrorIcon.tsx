import React from "react";
// @ts-ignore
import { SomethingWrongSvg } from "@dscl-ttg/assets";
import { useTheme } from "@mui/material";

const ErrorIcon: React.FC = () => {
  const theme = useTheme();
  return <SomethingWrongSvg fill={theme.palette.primary.main} />;
};

export default ErrorIcon;
