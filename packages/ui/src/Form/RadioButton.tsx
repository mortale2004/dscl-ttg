import React, { memo, ReactNode } from "react";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioProps as MuiRadioProps,
  Box,
} from "@mui/material";

// Main RadioButton component
export type RadioButtonProps = RadioButtonUIProps & {
  name: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    hookForm: UseFormReturn<any, any, undefined>
  ) => void;
};

const RadioButton: React.FC<RadioButtonProps> = memo(
  ({ name, onChange, ...radioButtonProps }) => {
    const hookForm = useFormContext();
    return (
      <Controller
        name={name}
        control={hookForm.control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonUI
            name={name}
            onChange={
              onChange
                ? (event) => {
                    field.onChange(event);
                    onChange(event, hookForm);
                  }
                : field.onChange
            }
            value={field.value}
            error={!!error}
            helperText={error?.message}
            {...radioButtonProps}
          />
        )}
      />
    );
  }
);

// Basic RadioButton UI component
type RadioButtonUIProps = {
  name: string;
  label?: string;
  required?: boolean;
  radioButtons?: any[];
  error?: boolean;
  helperText?: string;
  sx?: object;
  optionLabelKey?: string;
  optionValueKey?: string;
  renderRadioButtons?: (buttons: any[]) => ReactNode;
  fullWidth?: boolean;
} & MuiRadioProps;

export const RadioButtonUI: React.FC<RadioButtonUIProps> = memo(
  ({
    value,
    onChange,
    name,
    label,
    required = true,
    radioButtons = defaultRadioButtons,
    helperText,
    sx,
    optionLabelKey = "value",
    optionValueKey = "_id",
    fullWidth = true,
    renderRadioButtons = (buttons: any[]) =>
      buttons.map((button: any, i) => (
        <FormControlLabel
          key={i}
          value={button[optionValueKey]}
          control={<Radio />}
          label={button[optionLabelKey]}
        />
      )),
  }) => {
    return (
      <FormControl required={required} fullWidth={fullWidth}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            ...sx,
          }}
        >
          <FormLabel
            style={{ color: helperText && "#f44336", padding: "0 0 0 17px" }}
            id={`${name}-label`}
          >
            {label}
          </FormLabel>

          <RadioGroup
            value={value}
            onChange={onChange as any}
            row
            name={name}
            sx={{ pl: 2 }}
          >
            {renderRadioButtons(radioButtons)}
          </RadioGroup>
        </Box>

        <FormHelperText style={{ color: "#f44336", margin: "0px 0 0 13px" }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    );
  }
);

export default RadioButton;

const defaultRadioButtons = [
  {
    _id: true,
    value: "Yes",
  },
  {
    _id: false,
    value: "No",
  },
];
