import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
  AutocompleteProps,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import { Controller, Control, ControllerRenderProps } from "react-hook-form";

// Main Autocomplete component
type AutoCompleteFieldProps = {
  control: Control<any>;
  name: string;
  onChange?: (
    event: React.ChangeEvent<{}> | { target: { value: string[] } },
    field?: ControllerRenderProps<any>,
  ) => void;
} & AutocompleteFieldUIProps;

const AutoCompleteField: React.FC<AutoCompleteFieldProps> = memo(
  ({
    name,
    control,
    onChange,
    options,
    renderOptions,
    optionValueKey,
    optionLabelKey,
    label,
    ...autocompleteProps
  }) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <AutocompleteFieldUI
          name={name}
          onChange={
            onChange ? (event) => onChange(event, field) : field.onChange
          }
          value={field.value} // Default to empty array for multi-select
          error={!!error}
          errorText={error?.message}
          options={options}
          renderOptions={renderOptions} // Pass custom render function
          optionValueKey={optionValueKey}
          optionLabelKey={optionLabelKey}
          label={label}
          {...autocompleteProps}
        />
      )}
    />
  ),
);

// Basic Autocomplete UI component
type AutocompleteFieldUIProps = {
  name: string;
  label: string;
  options: any[];
  renderOptions?: (options: any[]) => JSX.Element[]; // Custom render function for options
  optionValueKey?: string;
  optionLabelKey?: string;
  error?: boolean;
  errorText?: string;
  loading?: boolean; // To handle loading state
} & AutocompleteProps<any, boolean, boolean, boolean>;

export const AutocompleteFieldUI: React.FC<AutocompleteFieldUIProps> = memo(
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
    loading,
    ...rest
  }) => (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel
        style={{ color: errorText ? "#f44336" : undefined }} // Conditional error color
        id={name}
      >
        {label}
      </InputLabel>
      <Autocomplete
        multiple // Enable multiple selection
        value={field.value} // Default to empty array for multi-select
        onChange={onChange}
        options={options}
        getOptionLabel={(option) => option[optionLabelKey]} // Specify label for each option
        renderOption={(props, option) => (
          <li {...props} key={option[optionValueKey]}>
            {option[optionLabelKey]}
          </li>
        )}
        isOptionEqualToValue={(option, value) =>
          option[optionValueKey] === value[optionValueKey]
        }
        loading={loading} // Pass loading state to Autocomplete
        {...rest}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: "16px",
            marginTop: "-12px",
          }}
        />
      )}
      {errorText && (
        <FormHelperText style={{ color: "#f44336", margin: "3px 0 0 13px" }}>
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  ),
);

export default AutoCompleteField;
