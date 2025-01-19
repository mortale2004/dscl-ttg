import { InputAdornment } from "@mui/material";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import React, { memo } from "react";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import { MdAdd } from "react-icons/md";

// Main TextField component
type TextFieldProps = TextFieldUIProps & {
  name: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<any, string>,
  ) => void;
};

const TextField: React.FC<TextFieldProps> = memo(
  ({ name, onChange, ...textFieldProps }) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextFieldUI
              name={name}
              onChange={
                onChange ? (event) => onChange(event, field) : field.onChange
              }
              value={field.value}
              error={!!error}
              helperText={error?.message}
              {...textFieldProps}
            />
          );
        }}
      />
    );
  },
);

// Basic TextField UI component
export type TextFieldUIProps = MuiTextFieldProps & {
  name: string;
};

export const TextFieldUI: React.FC<TextFieldUIProps> = memo(
  ({
    name,
    error,
    helperText,
    label,
    type,
    disabled,
    autoFocus,
    size,
    sx,
    multiline,
    rows,
    variant = "outlined",
    onChange,
    value,
    placeholder,
    required = true,
    ...rest
  }) => {
    return (
      <MuiTextField
        {...rest}
        name={name}
        onChange={onChange}
        value={value}
        label={label}
        type={type}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={(label as string) || placeholder}
        size={size}
        sx={sx}
        multiline={multiline}
        rows={rows}
        error={error}
        helperText={helperText}
        fullWidth
        variant={variant}
        required={required}
      />
    );
  },
);

export default TextField;
