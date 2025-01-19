import { confirmDialogAtom, crudDeleteItemAtom } from "@dscl-ttg/store";
import IconButton from "@ui/IconButton";
import React, { memo, SyntheticEvent, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type DeleteActionProps = {
  item: any;
};

const DeleteAction: React.FC<DeleteActionProps> = memo(({ item }) => {
  const setConfirmDialogAtom = useSetRecoilState(confirmDialogAtom);
  const setDeletingItem = useSetRecoilState(crudDeleteItemAtom);
  const onClick = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      setConfirmDialogAtom(true);
      setDeletingItem(item);
    },
    [item],
  );
  return (
    <IconButton onClick={onClick}>
      <MdDelete />
    </IconButton>
  );
});

export default DeleteAction;
