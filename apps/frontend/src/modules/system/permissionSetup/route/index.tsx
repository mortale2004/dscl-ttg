import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { routeSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const Route = () => {
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

export default Route;

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
  route_name: selected?.route_name ? selected.route_name : "",
  api_route: selected?.api_route ? selected.api_route : "",
  ui_route: selected?.ui_route ? selected.ui_route : "",
  module_id: selected?.module_id ? selected.module_id : "",
  description: selected?.description ? selected.description : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = routeSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Route";
const hookName = "route";

const tableDataKeys = [
  "module_name",
  "route_name",
  "api_route",
  "ui_route",
  "is_active",
];

const tableHeaders = [
  "Module",
  "Route Name",
  "API Route",
  "UI Route",
  "Status",
];

const getDeleteContent = (item: any) => {
  return `${item?.route_name} ${componentName}`;
};
