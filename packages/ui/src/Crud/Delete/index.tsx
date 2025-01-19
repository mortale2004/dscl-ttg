import { crudDeleteItemAtom } from "@dscl-ttg/store";
import ConfirmDialog from "@ui/ConfirmDialog";
import React, { Fragment, memo, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { useRecoilValue } from "recoil";

type Delete = {
  componentName: string;
  getDeleteContent: Function;
  onConfirm: (item: any) => void;
};

const Delete: React.FC<Delete> = ({
  componentName,
  getDeleteContent,
  onConfirm,
}) => {
  const deletingItem = useRecoilValue(crudDeleteItemAtom);
  const TitleComponent = useMemo(
    () => (
      <Fragment>
        <MdDelete />
        {componentName}
      </Fragment>
    ),
    [componentName],
  );

  return (
    <ConfirmDialog
      isOpen={false}
      TitleComponent={TitleComponent}
      ContentComponent={(() => (
        <Fragment>
          Are you sure you want to delete&nbsp;
          <b>{getDeleteContent(deletingItem)}</b>&nbsp;?
        </Fragment>
      ))()}
      onConfirm={() => onConfirm(deletingItem)}
    />
  );
};

export default memo(Delete);
