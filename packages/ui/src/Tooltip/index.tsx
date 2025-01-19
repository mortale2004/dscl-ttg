import React, { memo } from "react";
import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";
type TooltipProps = {
  sx?: any;
} & MuiTooltipProps;

const Tooltip: React.FC<TooltipProps> = memo(
  ({ title, placement = "top", sx, children }) => {
    return (
      <MuiTooltip
        title={title}
        placement={placement}
        arrow
        sx={
          sx?.maxWidth
            ? {
                [`& .${tooltipClasses.tooltip}`]: {
                  maxWidth: sx?.maxWidth,
                },
              }
            : undefined
        }
      >
        {children}
      </MuiTooltip>
    );
  },
);

export default Tooltip;
