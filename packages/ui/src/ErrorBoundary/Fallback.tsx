import { Box, Button, Typography } from "@mui/material";
import { memo } from "react";
import ErrorIcon from "./ErrorIcon";

type FallbackProps = {
  error: any;
  resetErrorBoundary: () => void;
};

const Fallback: React.FC<FallbackProps> = memo(
  ({ error, resetErrorBoundary }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          textAlign: "center",
          "& svg": {
            width: "100%",
            maxWidth: 400,
            color: "primary.main",
          },
        }}
      >
        <ErrorIcon />
        <Typography
          variant="h2"
          component="h2"
          style={{ fontSize: 30, marginTop: 16 }}
        >
          Ah! something went wrong!
        </Typography>
        <Typography style={{ fontSize: 18, marginTop: 12 }}>
          Brace yourself till we get the error fixed.
        </Typography>
        <Typography style={{ fontSize: 18 }}>
          You may also refresh the page or try again later.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 16,
          }}
          onClick={resetErrorBoundary}
        >
          Try again
        </Button>
      </Box>
    );
  },
);
export default Fallback;
