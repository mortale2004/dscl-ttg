import { Box, Theme } from "@mui/material";
import React, { memo } from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = memo(({ children }) => {
  return (
    <Box
      sx={{
        padding: { xl: "20px", lg: "20px", md: "10px", sm: "5px", xs: "2px" },
        height: {
          xs: `calc(100vh - 55px); !important`,
          sm: `calc(100vh - 55px); !important`,
          md: `calc(100vh - 55px); !important`,
          lg: `calc(100vh - 55px); !important`,
          xl: `calc(100vh - 55px); !important`,
        },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          background: "white",
          height: "100%",
          border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
});

export default Container;
