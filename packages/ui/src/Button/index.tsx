import React, { memo } from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
type ButtonProps = {
  children: React.ReactNode;
} & MuiButtonProps;

const Button: React.FC<ButtonProps> = memo(
  ({
    children,
    variant = "contained",
    onClick,
    startIcon,
    endIcon,
    sx,
    size,
    disabled,
    type,
    ...rest
  }) => {
    return (
      <MuiButton
        sx={sx}
        startIcon={startIcon}
        endIcon={endIcon}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        size={size}
        type={type}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);

export default Button;
