import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import React, { memo } from "react";
import {
  Controller,
  Control,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TextFieldProps, InputAdornment } from "@mui/material";
import { FaCalendarAlt } from "react-icons/fa";

dayjs.extend(utc);

// Main DateField component
type DateFieldProps = {
  name: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<any, string>,
  ) => void;
};

const DateField: React.FC<DateFieldProps & DateFieldUIProps> = memo(
  ({ name, onChange, ...dateFieldProps }) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DateFieldUI
            name={name}
            onChange={
              onChange ? (event) => onChange(event, field) : field.onChange
            }
            value={field.value}
            error={!!error}
            helperText={error?.message}
            {...dateFieldProps}
          />
        )}
      />
    );
  },
);

// Basic DateField UI component
type DateFieldUIProps = DatePickerProps<any, any> &
  TextFieldProps & {
    name: string;
    setEndDate?: boolean;
  };

export const DateFieldUI: React.FC<DateFieldUIProps> = memo(
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
    setEndDate,
    fullWidth = true,
    ...rest
  }) => (
    <DatePicker
      onChange={onChange as any}
      sx={sx}
      label={label}
      value={value ? dayjs.utc(value) : null}
      timezone="UTC"
      format="DD MMM YYYY"
      slotProps={{
        textField: {
          fullWidth: fullWidth,
          size: size,
          error: error,
          helperText: helperText,
          required: required,
          placeholder: (label as string) || placeholder,
        },
      }}
      {...rest}
    />
  ),
);

export default DateField;
