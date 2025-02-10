import React, { memo } from "react";
import IconButton from "./index";
import { MdDelete } from "react-icons/md";
import Tooltip from "@ui/Tooltip";

type DeleteIconButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
};

const DeleteIconButton: React.FC<DeleteIconButtonProps> = memo(
  ({ onClick, title }) => {
    if (title) {
      return (
        <Tooltip title={title}>
          <IconButton color="error" onClick={onClick}>
            <MdDelete />
          </IconButton>
        </Tooltip>
      );
    }
    return (
      <IconButton color="error" onClick={onClick}>
        <MdDelete />
      </IconButton>
    );
  },
);

export default DeleteIconButton;