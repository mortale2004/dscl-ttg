import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { dcyaMappingSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const DcyaMapping = () => {
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
      maxWidth="lg"
      getFormData={getFormData}
    />

  );
};

export default DcyaMapping;

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
  academic_year_id: selected?.academic_year_id ? selected.academic_year_id: "",
  course_id: selected?.course_id ? selected.course_id: "",
  course_sem_id: selected?.course_sem_id ? selected.course_sem_id: "",
  department_id: selected?.department_id ? selected.department_id: "",
  division_id: selected?.division_id ? selected.division_id: "",
  classroom_id: selected?.classroom_id ? selected.classroom_id: "",
  is_active: selected && "is_active" in selected ? selected.is_active : true,
  paper_type_id: "",
  paper_id:"",
  papers: selected?.papers ? selected.papers : [],
  paper_ids: selected?.paper_ids ? selected.paper_ids : [],
});

const getFormData = (data: any) => {
  return {
    _id: data._id,
    academic_year_id: data.academic_year_id,
    course_id: data.course_id,
    course_sem_id: data.course_sem_id,
    department_id: data.department_id,
    division_id: data.division_id,
    classroom_id: data.classroom_id,
    is_active: data.is_active,
    paper_ids: data?.papers?.map((paper: any) => paper._id),
  };
};

const schema = dcyaMappingSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "DCYA Mapping";
const hookName = "dcyaMapping";

const tableDataKeys = ["course_name", "course_sem_name", "division_name", 'classroom_name', "is_active"];

const tableHeaders = ["Course", "Sem", "Division", "Classroom", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.course_name} ${item?.course_sem_name} ${item?.division_name} ${componentName}`;
};
