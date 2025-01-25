import { apiHooks } from "@dscl-ttg/hooks";
import {
  crudDataAtom,
  crudDataAtomType,
  crudFormDialogAtom,
  dialogAtom,
} from "@dscl-ttg/store";
import Dialog from "@ui/Dialog";
import { Form } from "@ui/Form";
import React, { ComponentType, memo, useCallback, useMemo } from "react";
import { IoAddOutline, IoDuplicate } from "react-icons/io5";
import { RiEditCircleFill } from "react-icons/ri";
import { useRecoilState, useSetRecoilState } from "recoil";

export type CreateOrUpdateProps = {
  componentName: string;
  hookName: any;
  getDefaultValues: (data: any, mode: any) => any;
  FormComponent: ComponentType<any>;
  schema: any;
  maxWidth?: any;
  customOnCreateSuccess?: (data: any) => void;
  customOnUpdateSuccess?: (data: any) => void;
  fullScreen?: boolean;
  getFormData?:Function;
};

const CreateOrUpdate: React.FC<CreateOrUpdateProps> = ({
  componentName,
  hookName,
  getDefaultValues,
  FormComponent,
  schema,
  maxWidth,
  customOnCreateSuccess,
  customOnUpdateSuccess,
  fullScreen,
  getFormData
}) => {
  const [crudForm, setCrudForm] = useRecoilState(crudFormDialogAtom);
  const setCrudData = useSetRecoilState(crudDataAtom);
  const setDialog = useSetRecoilState(dialogAtom);

  const onCreateSuccess = useCallback(
    (newData: any) => {
      setDialog(false);
      setCrudForm({
        mode: "create",
        data: null,
      });
      setCrudData((prev: crudDataAtomType) => ({
        data: [...prev.data, newData.data],
        count: prev.count + 1,
      }));
    },
    [setCrudForm, setCrudData, setDialog]
  );

  const onUpdateSuccess = useCallback(
    (updatedResponse: any) => {
      setDialog(false);
      setCrudForm({
        mode: "create",
        data: null,
      });
      setCrudData((prev: crudDataAtomType) => {
        return {
          data: prev.data.map((dataItem) =>
            dataItem._id === updatedResponse?.data._id
              ? updatedResponse?.data
              : dataItem
          ),
          count: prev.count,
        };
      });
    },
    [setCrudForm, setCrudData, setDialog]
  );
  const create = apiHooks[hookName]?.useCreate?.(
    {},
    customOnCreateSuccess || onCreateSuccess
  );
  const update = apiHooks[hookName]?.useUpdate?.(
    {},
    customOnUpdateSuccess || onUpdateSuccess
  );

  const onSubmit = useCallback(
    (data: any) => {
      if (crudForm.mode === "create" || crudForm.mode === "duplicate") {
        delete data._id;
        create?.mutate?.(getFormData ? getFormData(data) : data);
      } else {
        update?.mutate?.(getFormData ? getFormData(data) : data); 
      }
    },
    [crudForm.mode, update?.mutate, create?.mutate, getFormData]
  );

  const TitleComponent = useMemo(
    () =>
      crudForm.mode === "create" ? (
        <>
          <IoAddOutline />
          Create {componentName}
        </>
      ) : crudForm.mode === "update" ? (
        <>
          <RiEditCircleFill />
          Update {componentName}
        </>
      ) : (
        <>
          <IoDuplicate />
          Copy to Create {componentName}
        </>
      ),
    [componentName, crudForm.mode]
  );

  return (
    <Dialog
      TitleComponent={TitleComponent}
      dividers={false}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
    >
      <Form
        defaultValues={getDefaultValues(crudForm.data, crudForm.mode)}
        onSubmit={onSubmit}
        FormComponent={FormComponent}
        schema={schema}
      />
    </Dialog>
  );
};

export default memo(CreateOrUpdate);
