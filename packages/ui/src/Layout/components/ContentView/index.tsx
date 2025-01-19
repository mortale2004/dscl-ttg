import React, { memo } from "react";
import Box from "@mui/material/Box";
import { ErrorBoundary } from "@ui/ErrorBoundary";
import Suspense from "@ui/Suspense";

type ContentViewProps = {
  children: React.ReactNode;
};

const ContentView: React.FC<ContentViewProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        mx: { xl: "auto" },
        width: { xl: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
        className="app-content"
      >
        <Suspense>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </Box>
    </Box>
  );
};

export default memo(ContentView);
