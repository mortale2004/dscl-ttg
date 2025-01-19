import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { departmentSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const Department = () => {
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

export default Department;

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
  department_name: selected?.department_name ? selected.department_name : "",
  department_short_name: selected?.department_short_name ? selected.department_short_name : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = departmentSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Department";
const hookName = "department";

const tableDataKeys = ["department_name",  "department_short_name", "is_active"];

const tableHeaders = ["Department", "Short Name", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.department_name} ${componentName}`;
};
