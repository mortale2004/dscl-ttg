import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import React, { memo } from "react";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TextFieldProps } from "@mui/material";

dayjs.extend(utc);

// Main TimeField component
type TimeFieldProps = TimeFieldUIProps & {
  name: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<any, string>,
  ) => void;
};

const TimeField: React.FC<TimeFieldProps> = memo(
  ({ name, onChange, ...timeFieldProps }) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TimeFieldUI
            name={name}
            onChange={
              onChange ? (event) => onChange(event, field) : field.onChange
            }
            value={field.value}
            error={!!error}
            helperText={error?.message}
            {...timeFieldProps}
          />
        )}
      />
    );
  },
);

// Basic TimeField UI component
type TimeFieldUIProps = TimePickerProps<any, any> &
  TextFieldProps & {
    name: string;
    setEndTime?: boolean;
  };

export const TimeFieldUI: React.FC<TimeFieldUIProps> = memo(
  ({
    name,
    error,
    helperText,
    label,
    type,
    disabled,
    size,
    sx,
    variant = "outlined",
    onChange,
    value,
    placeholder,
    required = true,
    setEndTime,
    fullWidth = true,
    ...rest
  }) => (
    <TimePicker
      onChange={onChange as any}
      sx={sx}
      value={dayjs.utc(value)}
      timezone="UTC"
      slotProps={{
        textField: {
          fullWidth: fullWidth,
          size: size,
          error: error,
          helperText: helperText,
          required: required,
        },
      }}
      {...rest}
    />
  ),
);

export default TimeField;
