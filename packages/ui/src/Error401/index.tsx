import { Box, Button, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FONTS } from "@dscl-ttg/constants";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import Animate from "@ui/Animate";
// @ts-ignore
import { Error401Svg } from "@dscl-ttg/assets";

type Error401Props = {};

const Error401: React.FC<Error401Props> = memo(({}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onGoBackToHome = () => {
    navigate("/");
  };

  return (
    <Animate>
      <Box
        sx={{
          py: { xl: 8 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: { xs: 4, xl: 8 },
            width: "100%",
            maxWidth: { xs: 200, sm: 300, xl: 706 },
            "& svg": {
              width: "100%",
              maxWidth: 400,
            },
          }}
        >
          <Error401Svg fill={theme.palette.primary.main} />
        </Box>
        <Box sx={{ mb: { xs: 4, xl: 5 } }}>
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: FONTS.MEDIUM,
            }}
          >
            401 Unauthorized
          </Typography>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
              fontSize: 16,
              fontWeight: FONTS.MEDIUM,
            }}
          >
            <Typography>You are not authorized for this page</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: FONTS.MEDIUM,
              fontSize: 16,
              textTransform: "capitalize",
            }}
            onClick={onGoBackToHome}
          >
            Go Back To Home
          </Button>
        </Box>
      </Box>
    </Animate>
  );
});

export default Error401;
