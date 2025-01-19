import Animate from "@ui/Animate";
import { Box, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FONTS } from "@dscl-ttg/constants";
import React, { Fragment, memo } from "react";
// @ts-ignore
import { ComingSoon } from "@dscl-ttg/assets";

type ComingSoonProps = {};

const ComingSoon: React.FC<ComingSoonProps> = memo(({}) => {
  const theme = useTheme();
  return (
    <Animate>
      <Fragment>
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
            {/* @ts-ignore */}
            <ComingSoon fill={theme.palette.primary.main} />
          </Box>

          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: FONTS.MEDIUM,
            }}
          >
            Coming Soon!
          </Typography>

          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
            }}
          >
            <Typography style={{ fontSize: 18, marginTop: 3 }}>
              We are updating this page
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              and we will back soon.
            </Typography>
          </Box>
        </Box>
      </Fragment>
    </Animate>
  );
});

export default ComingSoon;
