import React, { useCallback } from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { paperSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";
import { apiHooks } from "@dscl-ttg/hooks";

const Paper = () => {

  const {data: course} = apiHooks?.course?.useGetList({
    is_active: true,
  }) 
  const {data: courseSem} = apiHooks?.courseSem?.useGetList({
    is_active: true,
  })
  const FormComponent = useCallback((props:any) => <Form {...props} course={course} courseSem={courseSem} />, [course, courseSem]);
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

export default Paper;

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
  paper_name: selected?.paper_name ? selected.paper_name : "",
  paper_code: selected?.paper_code ? selected.paper_code : "",  
  course_id: selected?.course_id ? selected.course_id : "",
  course_sem_id: selected?.course_sem_id ? selected.course_sem_id : "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = paperSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Paper";
const hookName = "paper";

const tableDataKeys = ["paper_name", "paper_code", "course_name", "course_sem_name", "is_active"];

const tableHeaders = ["Paper", "Paper Code", "Course", "Sem", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.paper_name} ${componentName}`;
};
