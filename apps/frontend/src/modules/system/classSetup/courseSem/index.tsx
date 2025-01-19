import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { courseSemSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const CourseSem = () => {
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

export default CourseSem;

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
  course_sem_name: selected?.course_sem_name ? selected.course_sem_name : "",
  course_sem_number: selected?.course_sem_number ? selected.course_sem_number : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = courseSemSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Course Sem";
const hookName = "courseSem";

const tableDataKeys = ["course_sem_name", "course_sem_number", "is_active"];

const tableHeaders = ["Course Sem", "Sem Number", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.course_sem_name} ${componentName}`;
};
