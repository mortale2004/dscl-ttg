import { InputAdornment, TextFieldProps } from "@mui/material";
import { TextFieldUI } from "@ui/Form";
import React, { memo, useCallback } from "react";
import { Control, ControllerRenderProps } from "react-hook-form";
import { FcSearch } from "react-icons/fc";

type SearchBarProps = {
  control?: Control<any>;
  label?: string;
  name?: string;
  setLoading?: (loading: boolean) => void;
  onChange?: (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field?: ControllerRenderProps<any, string>,
  ) => void;
} & TextFieldProps;

let timeout: NodeJS.Timeout;
const defaultSlotProps = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <FcSearch />
      </InputAdornment>
    ),
  },
};

const Search: React.FC<SearchBarProps> = ({
  setLoading,
  onChange,
  name = "search",
  label = "Search",
  control,
  slotProps = defaultSlotProps,
  value,
  ...rest
}) => {
  const [innerValue, setInnerValue] = React.useState(value || "");
  const debouncedSearch = useCallback(
    (event: any, field?: ControllerRenderProps<any>) => {
      setLoading?.(true);
      clearTimeout(timeout);
      setInnerValue(event?.target?.value);
      timeout = setTimeout(() => {
        onChange?.(name, event, field);
      }, 700);
    },
    [onChange, setLoading],
  );

  return (
    <TextFieldUI
      {...rest}
      value={innerValue}
      name={name}
      onChange={debouncedSearch}
      label={label}
      size="small"
      variant="outlined"
      slotProps={slotProps}
    />
  );
};

export default memo(Search);
