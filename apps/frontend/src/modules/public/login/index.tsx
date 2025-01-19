import { Box, useTheme } from "@mui/material";
import { FONTS, theme } from "@dscl-ttg/constants";
import Animate from "@dscl-ttg/ui/Animate";
import Card from "@dscl-ttg/ui/Card";
import GridContainer from "@dscl-ttg/ui/GridContainer";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./Form";
// @ts-ignore
import { LoginSvg } from "@dscl-ttg/assets";

const Login: React.FC = () => {
  const theme = useTheme();

  return (
    <Animate>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 15,
        }}
      >
        <Card
          sx={{
            maxWidth: 1024,
            width: "100%",
            padding: 8,
            paddingLeft: { xs: 8, md: 2 },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <GridContainer>
            <GridItem
              md={6}
              sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                "& svg": {
                  width: "100%",
                  height: "100%",
                  display: "inline-block",
                  paddingRight: { xs: 0, lg: 10 },
                },
              }}
            >
              <LoginSvg fill={theme.palette.primary.main} />
            </GridItem>
            <GridItem
              md={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  fontWeight: FONTS.BOLD,
                  fontSize: 20,
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Login
              </Box>

              <LoginForm />

              <Box
                sx={{
                  color: "grey.700",
                  fontSize: 14,
                  fontWeight: FONTS.BOLD,
                  mt: { xs: 3, xl: 4 },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    mr: 2,
                  }}
                >
                  Don&apos;t Have account?
                </Box>
                <Link to="/register">
                  <Box
                    component="span"
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </Box>
                </Link>
              </Box>
            </GridItem>
          </GridContainer>
        </Card>
      </Box>
    </Animate>
  );
};

export default Login;
