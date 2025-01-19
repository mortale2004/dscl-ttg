import React, { memo, ReactNode, useCallback } from "react";
import CreateButtonUI from "./CreateButtonUI";
import { useSetRecoilState } from "recoil";
import { crudFormDialogAtom, dialogAtom } from "@dscl-ttg/store";

type WithCreateActionsProps = {
  children: ReactNode;
};
const WithCreateActions: React.FC<WithCreateActionsProps> = memo(
  ({ children }) => {
    const setCrudDialog = useSetRecoilState(crudFormDialogAtom);
    const setDialog = useSetRecoilState(dialogAtom);
    const onClick = useCallback(() => {
      setCrudDialog({
        mode: "create",
        data: null,
      });
      setDialog(true);
    }, [setCrudDialog]);
    return <CreateButtonUI onClick={onClick}>{children}</CreateButtonUI>;
  },
);

export default WithCreateActions;
