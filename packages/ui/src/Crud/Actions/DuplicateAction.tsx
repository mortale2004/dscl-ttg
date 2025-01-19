import { crudFormDialogAtom, dialogAtom } from "@dscl-ttg/store";
import IconButton from "@ui/IconButton";
import React, { memo, SyntheticEvent, useCallback } from "react";
import { IoDuplicateOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

type DuplicateActionProps = {
  item: any;
};

const DuplicateAction: React.FC<DuplicateActionProps> = memo(({ item }) => {
  const setEditDialogAtom = useSetRecoilState(crudFormDialogAtom);
  const setDialog = useSetRecoilState(dialogAtom);

  const onClick = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      setEditDialogAtom({
        mode: "duplicate",
        data: item,
      });
      setDialog(true);
    },
    [item],
  );

  return (
    <IconButton onClick={onClick}>
      <IoDuplicateOutline />
    </IconButton>
  );
});

export default DuplicateAction;
