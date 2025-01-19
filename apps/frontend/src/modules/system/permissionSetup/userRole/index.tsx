import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { userRoleSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const UserRole = () => {
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

export default UserRole;

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
  user_role_name: selected?.user_role_name ? selected.user_role_name : "",
  user_role_weight: selected?.user_role_weight ? selected.user_role_weight : "",
  layout_type_id: selected?.layout_type_id ? selected.layout_type_id : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = userRoleSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "User Role";
const hookName = "userRole";

const tableDataKeys = [
  "user_role_name",
  "user_role_weight",
  "layout_type_name",
  "is_active",
];

const tableHeaders = ["User Role", "Role Weight", "Layout Type", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.user_role_name} ${componentName}`;
};
