import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { paperTypeSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const PaperType = () => {
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

export default PaperType;

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
  paper_type_name: selected?.paper_type_name ? selected.paper_type_name : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = paperTypeSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "PaperType";
const hookName = "paperType";

const tableDataKeys = ["paper_type_name", "is_active"];

const tableHeaders = ["PaperType", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.paper_type_name} ${componentName}`;
};
