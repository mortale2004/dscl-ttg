import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { layoutTypeSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const LayoutType = () => {
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

export default LayoutType;

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
  layout_type_name: selected?.layout_type_name ? selected.layout_type_name : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = layoutTypeSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Layout Type";
const hookName = "layoutType";

const tableDataKeys = ["layout_type_name", "is_active"];

const tableHeaders = ["Layout Type", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.layout_type_name} ${componentName}`;
};
