import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { academicYearSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";

const AcademicYear = () => {
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

export default AcademicYear;

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
  academic_year_name: selected?.academic_year_name ? selected.academic_year_name : "",
  start_date:  selected?.start_date ? selected.start_date : null,
  end_date: selected?.end_date ? selected.end_date : null,
  is_defualt: selected?.is_defualt ? selected.is_defualt : false,
  is_active: selected && "is_active" in selected ? selected.is_active : true,
});

const schema = academicYearSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Academic Year";
const hookName = "academicYear";

const tableDataKeys = ["academic_year_name", 'start_date', 'end_date', 'is_current', "is_active"];

const tableHeaders = ["Academic Year", "Start Date", "End Date", "Default", "Status"];

const getDeleteContent = (item: any) => {
  return `${item?.academic_year_name} ${componentName}`;
};
