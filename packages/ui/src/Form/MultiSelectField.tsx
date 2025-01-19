import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  FormHelperText,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import {
  Controller,
  Control,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";

// Main Select component
type MultiSelectFieldProps = {
  name: string;
  onChange?: (
    event:
      | SelectChangeEvent<unknown>
      | {
          target: {
            value: string[];
          };
        },
    field?: ControllerRenderProps<any>
  ) => void;
};

const MultiSelectField: React.FC<
  MultiSelectFieldProps & MultiSelectFieldUIProps
> = memo(
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
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MultiSelectFieldUI
            name={name}
            onChange={
              onChange ? (event: any) => onChange(event, field) : field.onChange
            }
            error={!!error}
            errorText={error?.message}
            options={options}
            renderOptions={renderOptions} // Pass custom render function
            optionValueKey={optionValueKey}
            optionLabelKey={optionLabelKey}
            label={label}
            {...selectProps}
            value={field.value} // Default to empty array for multi-select
          />
        )}
      />
    );
  }
);

// Basic Select UI component
type MultiSelectFieldUIProps = {
  name: string;
  value?: any[];
  label: string;
  options: any[];
  renderOptions?: (options: any[]) => JSX.Element[]; // Custom render function for options
  optionValueKey?: string;
  optionLabelKey?: string;
  error?: boolean;
  errorText?: string;
  getLabel?: (option: any) => string; // Custom label function for options
} & SelectProps;

export const MultiSelectFieldUI: React.FC<MultiSelectFieldUIProps> = memo(
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
    size,
    required = true,
    value = [],
    getLabel,
    renderValue = (selected: string[] = []) => {
      // Default renderValue to display selected options as a comma-separated list
      return selected
        .map((val: string) => {
          const selectedOption = options.find(
            (option) => option[optionValueKey] === val
          );
          return selectedOption
            ? getLabel
              ? getLabel(selectedOption)
              : selectedOption[optionLabelKey]
            : "";
        })
        .join(", ");
    },
    ...rest
  }) => (
    <FormControl required={required} fullWidth size={size} error={error}>
      <InputLabel
        style={{ color: errorText ? "#f44336" : undefined }} // Conditional error color
        id={name}
      >
        {label}
      </InputLabel>
      <Select
        multiple // Enable multiple selection
        value={options.length ? value : ""} // Default to empty array for multi-select
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
        renderValue={renderValue as any}
      >
        {renderOptions
          ? renderOptions(options)
          : options.map((option) => (
              <MenuItem
                key={option[optionValueKey]}
                value={option[optionValueKey]}
              >
                <Checkbox
                  sx={{
                    p: 0,
                  }}
                  checked={value.includes(option[optionValueKey])}
                />
                <ListItemText
                  primary={getLabel ? getLabel(option) : option[optionLabelKey]}
                />
              </MenuItem>
            ))}
      </Select>
      {errorText && (
        <FormHelperText style={{ color: "#f44336", margin: "3px 0 0 13px" }}>
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  )
);

export default MultiSelectField;
