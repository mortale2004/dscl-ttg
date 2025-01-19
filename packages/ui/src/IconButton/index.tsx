import React, { forwardRef, memo, useMemo } from "react";
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import { alpha, Theme } from "@mui/material";
import Tooltip from "@ui/Tooltip";

type IconButtonProps = {} & MuiIconButtonProps;

const IconButton: React.FC<IconButtonProps> = memo(
  ({ title, ...IconButtonUIProps }) => {
    return title ? (
      <IconButtonWithTooltip title={title} {...IconButtonUIProps} />
    ) : (
      <IconButtonUI {...IconButtonUIProps} />
    );
  },
);

export default IconButton;

type IconButtonWithTooltipProps = {} & MuiIconButtonProps;

export const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = memo(
  ({ title, ...iconButtonUIProps }) => {
    return (
      <Tooltip title={title}>
        <IconButtonUI {...iconButtonUIProps} />
      </Tooltip>
    );
  },
);

type IconButtonUIProps = {} & MuiIconButtonProps;

export const IconButtonUI: React.FC<IconButtonUIProps> = memo(
  forwardRef(({ sx, children, onClick, ...rest }, ref) => {
    // const styles = useMemo(() => ({ ...defaultIconStyles, ...sx }), [sx]);
    return (
      <MuiIconButton {...rest} sx={sx} ref={ref} onClick={onClick}>
        {children}
      </MuiIconButton>
    );
  }),
);

const defaultIconStyles = {
  mx: 0.6,
  borderRadius: "50%",
  width: 40,
  height: 40,
  color: (theme: Theme) => theme.palette.text.secondary,
  backgroundColor: (theme: Theme) => theme.palette.background.default,
  border: 1,
  borderColor: "transparent",
  "&:hover, &:focus": {
    color: (theme: Theme) => theme.palette.text.primary,
    backgroundColor: (theme: Theme) =>
      alpha(theme.palette.background.default, 0.9),
    borderColor: (theme: Theme) => alpha(theme.palette.text.secondary, 0.25),
  },
};

export const iconButtonStyles = {
  mx: 0.6,
  height: "30px",
  width: "30px",
  color: "primary.main",
  border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
  background: "transparent",
  "& svg": {
    fontSize: "18px",
  },
  padding: 0,
  ":hover": {
    border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
    color: "primary.main",
  },
};
