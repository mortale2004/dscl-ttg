import React, { memo } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Box, Button, Grid, Typography } from "@mui/material";

type SplittedFieldProps = {
  name: string;
  numInputs: number;
  label: string;
  onChange?: Function;
};
const SplittedField: React.FC<SplittedFieldProps> = memo(
  ({ name, numInputs, label, onChange }) => {
    const hookForm = useFormContext();
    return (
      <Controller
        name={name}
        control={hookForm.control}
        render={({ field }) => (
          <Box>
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              {label}
            </Typography>
            <OtpInput
              {...field}
              onChange={(value) => {
                if (onChange) {
                  onChange(value);
                }
                field.onChange(value);
              }}
              numInputs={numInputs}
              renderSeparator={<span>-</span>}
              renderInput={(inputProps) => <input {...inputProps} />}
              inputStyle={{
                width: "40px",
                height: "40px",
                margin: "5px",
                textAlign: "center",
                fontSize: "18px",
              }}
              containerStyle={{
                justifyContent: "center",
              }}
            />
          </Box>
        )}
      />
    );
  }
);

export default SplittedField;
