import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import {
  Controller,
  Control,
  ControllerRenderProps,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

// Main Select component
type SelectFieldProps = SelectFieldUIProps & {
  name: string;
  onChange?: (
    event:
      | SelectChangeEvent<unknown>
      | {
          target: {
            value: string;
          };
        },
    hookForm: UseFormReturn<any, any, undefined>,
  ) => void;
};

const SelectField: React.FC<SelectFieldProps> = memo(
  ({
    name,
    onChange,
    options = [],
    renderOptions,
    optionValueKey,
    optionLabelKey,
    label,
    ...selectProps
  }) => {
    const hookForm = useFormContext();
    return (
      <Controller
        name={name}
        control={hookForm.control}
        render={({ field, fieldState: { error } }) => (
          <SelectFieldUI
            {...selectProps}
            name={name}
            onChange={
              onChange
                ? (event) => {
                    onChange(event, hookForm);
                    field.onChange(event);
                  }
                : field.onChange
            }
            value={options?.length ? field.value : ""}
            error={!!error}
            errorText={error?.message}
            options={options}
            renderOptions={renderOptions}
            optionValueKey={optionValueKey}
            optionLabelKey={optionLabelKey}
            label={label}
          />
        )}
      />
    );
  },
);

// Basic Select UI component
type SelectFieldUIProps = {
  name: string;
  label: string;
  options: any[];
  renderOptions?: (options: any[]) => JSX.Element[]; // Custom render function for options
  optionValueKey?: string;
  optionLabelKey?: string;
  error?: boolean;
  errorText?: string;
} & SelectProps;

export const SelectFieldUI: React.FC<SelectFieldUIProps> = memo(
  ({
    name,
    label,
    options,
    renderOptions,
    optionValueKey = "_id",
    optionLabelKey = "label",
    error,
    errorText,
    onChange,
    value,
    size,
    required = true,
    fullWidth = true,
    ...rest
  }) => {
    return (
      <FormControl required={required} fullWidth={fullWidth} size={size} error={error}>
        <InputLabel
          style={{ color: errorText ? "#f44336" : undefined }} // Conditional error color
          id={name}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label={label}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200, // Set the max height of the dropdown
              },
            },
          }}
          fullWidth
          {...rest}
        >
          {renderOptions
            ? renderOptions(options)
            : options.map((option) => (
                <MenuItem
                  key={option[optionValueKey]}
                  value={option[optionValueKey]}
                >
                  {option[optionLabelKey]}
                </MenuItem>
              ))}
        </Select>
        {errorText && (
          <FormHelperText style={{ color: "#f44336", margin: "3px 0 0 13px" }}>
            {errorText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);

export default SelectField;
