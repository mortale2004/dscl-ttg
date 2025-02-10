import React, { Fragment, memo } from "react";
import IconButton from "./index";
import { Box } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";
import Tooltip from "@ui/Tooltip";

type AddIconButtonProps = {
  title?: string;
  name?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};
const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  float: "right",
  cursor: "pointer",
  color: "primary.main",
};
const AddIconButton: React.FC<AddIconButtonProps> = memo(
  ({ title, onClick, name }) => {
    if (title) {
      return (
        <Tooltip title={title}>
          <Box sx={containerStyles} onClick={onClick}>
            <IconButton color="primary">
              <IoAddCircleOutline />
            </IconButton>
            {name}
          </Box>
        </Tooltip>
      );
    }
    return (
      <Box sx={containerStyles} onClick={onClick}>
        <IconButton color="primary">
          <IoAddCircleOutline />
        </IconButton>
        {name}
      </Box>
    );
  },
);

export default AddIconButton;