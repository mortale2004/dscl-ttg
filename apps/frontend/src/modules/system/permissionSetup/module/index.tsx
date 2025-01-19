import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { moduleSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const Module = () => {
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

export default Module;

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
  module_name: selected?.module_name ? selected.module_name : "",
  parent_id: selected?.parent_id ? selected.parent_id : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = moduleSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Module";
const hookName = "module";

const tableDataKeys = ["module_name", "parent_module_name", "is_active"];

const tableHeaders = ["Module", "Parent Module", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.module_name} ${componentName}`;
};
