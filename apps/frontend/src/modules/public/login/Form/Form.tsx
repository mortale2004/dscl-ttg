import { Box, Checkbox, InputAdornment } from "@mui/material";
import { FONTS } from "@dscl-ttg/constants";
import { TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, useCallback, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

type FormProps = {
  control: any;
};

const FormComponent: React.FC<FormProps> = ({}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, [setIsPasswordVisible]);
  return (
    <Fragment>
      <GridItem>
        <TextField name="username" label="Username" />
      </GridItem>

      <GridItem>
        <TextField
          name="password"
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={togglePasswordVisibility}
                  sx={{
                    cursor:"pointer",
                  }}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </InputAdornment>
              ),
            },
          }}
        />
      </GridItem>

      <GridItem>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              ml: -3,
            }}
          >
            <Checkbox />
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: 14,
            }}
          >
            Remember Me
          </Box>

          <Box
            component="span"
            sx={{
              cursor: "pointer",
              ml: { xs: 0, sm: "auto" },
              mt: { xs: 2, sm: 0 },
              fontWeight: FONTS.BOLD,
              fontSize: 14,
            }}
          >
            <Link to="/forget-password">
              <Box sx={{ color: "primary.main" }}>Forget Password</Box>
            </Link>
          </Box>
        </Box>
      </GridItem>
    </Fragment>
  );
};
export default FormComponent;
