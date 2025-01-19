import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { courseSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const Course = () => {
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

export default Course;

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
  course_name: selected?.course_name ? selected.course_name : "",
  course_short_name: selected?.course_short_name ? selected.course_short_name : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = courseSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Course";
const hookName = "course";

const tableDataKeys = ["course_name", "course_short_name", "is_active"];

const tableHeaders = ["Course", "Short Name", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.course_name} ${componentName}`;
};
