import React, { memo } from "react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Animate from "@ui/Animate";
// @ts-ignore
import { MaintenanceSvg } from "@dscl-ttg/assets";
import { FONTS } from "@dscl-ttg/constants";

type MaintenanceProps = {};

const Maintenance: React.FC<MaintenanceProps> = memo(({}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onGoBackToHome = () => {
    navigate("/");
  };

  return (
    <Animate animation="transition.slideUpIn" delay={200}>
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
          <MaintenanceSvg fill={theme.palette.primary.main} />
        </Box>
        <Box
          sx={{
            mb: { xs: 4, xl: 5 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: FONTS.MEDIUM,
            }}
          >
            Our site is under maintenance
          </Typography>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
              fontSize: 16,
              fontWeight: FONTS.MEDIUM,
            }}
          >
            <Typography>Our site is currently under scheduled</Typography>
            <Typography>maintenance. We will be back shortly.</Typography>
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

export default Maintenance;
