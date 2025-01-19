import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { classroomSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const Classroom = () => {
  return (
    <Crud
      componentName={componentName}
      hookName={hookName}
      getDeleteContent={getDeleteContent}
      headerProps={headerProps}
      tableHeaders={tableHeaders}
      tableDataKeys={tableDataKeys}
      getDefaultValues={getDefaultValues}
      FormComponent={Form}
      schema={schema}
    />
  );
};

export default Classroom;

const headerProps = {
  hasExportButton: false,
  hasPrintButton: false,
  hasComponentName: false,
  hasFiltersForm: true,
  filterFormProps: {
    BasicFilterForm: BasicFilterForm,
    getFilters: (selected: any) => ({
      is_active: selected && "is_active" in selected ? selected.is_active : "",
    }),
  },
};

const getDefaultValues = (selected: any, mode: CrudDialogMode) => ({
  _id: mode === "update" ? selected?._id : "",
  classroom_name: selected?.classroom_name ? selected.classroom_name : "",
  floor_number: selected?.floor_number ? selected.floor_number : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = classroomSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Classroom";
const hookName = "classroom";

const tableDataKeys = ["classroom_name", "floor_number", "is_active"];

const tableHeaders = ["Classroom", "Floor", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.classroom_name} ${componentName}`;
};
