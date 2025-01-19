import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LayoutProvider from "./LayoutProvider";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

const Provider: React.FC = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ThemeProvider>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ToastContainer />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <LayoutProvider />
              </LocalizationProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Provider;
