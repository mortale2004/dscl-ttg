import { crudFormDialogAtom, dialogAtom } from "@dscl-ttg/store";
import IconButton from "@ui/IconButton";
import React, { memo, SyntheticEvent, useCallback } from "react";
import { MdEdit } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type EditActionProps = {
  item: any;
};

const EditAction: React.FC<EditActionProps> = memo(({ item }) => {
  const setEditDialogAtom = useSetRecoilState(crudFormDialogAtom);
  const setDialog = useSetRecoilState(dialogAtom);

  const onClick = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      setEditDialogAtom({
        mode: "update",
        data: item,
      });
      setDialog(true);
    },
    [item],
  );

  return (
    <IconButton onClick={onClick}>
      <MdEdit />
    </IconButton>
  );
});

export default EditAction;
