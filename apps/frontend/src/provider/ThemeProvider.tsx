import { settingsSelector } from "@dscl-ttg/store";
import { useRecoilValue } from "recoil";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import React, { ReactNode } from "react";
type ThemeProviderProps = {
  children: ReactNode;
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const settings = useRecoilValue(settingsSelector);
  return (
    <MuiThemeProvider theme={createTheme(settings?.theme as any)}>
      {children}
    </MuiThemeProvider>
  );
};
export default ThemeProvider;
