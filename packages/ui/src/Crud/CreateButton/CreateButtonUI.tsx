import { Box, IconButton, Theme } from "@mui/material";
import { iconButtonStyles } from "@ui/IconButton";
import React, { memo, ReactNode } from "react";
import { GoPlus } from "react-icons/go";
type CreateButtonUIProps = {
  onClick: Function;
  children: ReactNode;
};
const CreateButtonUI: React.FC<CreateButtonUIProps> = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick as any} sx={iconButtonStyles}>
      <GoPlus />
    </IconButton>
  );
});

export default CreateButtonUI;
