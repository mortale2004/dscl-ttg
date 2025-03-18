import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import {
  timeTableCreateUpdateSchema,
  timeTableSchema,
} from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";
import Table from "@dscl-ttg/ui/Table";
import Container from "@dscl-ttg/ui/Container";

const TimeTable = () => {
  return (

    <Container>

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
      fullScreen
      />
      </Container>
  );
};

export default TimeTable;

const headerProps = {
  hasExportButton: false,
  hasPrintButton: false,
  hasComponentName: false,
  hasFiltersForm: true,
  filterFormProps: {
    BasicFilterForm: BasicFilterForm,
    getFilters: (selected: any) => ({
      is_break_slot:
        selected && "is_break_slot" in selected ? selected.is_break_slot : "",
    }),
  },
};

const getDefaultValues = (selected: any, mode: CrudDialogMode) => ({
  _id: mode === "update" ? selected?._id : "",
  academic_year_id: selected?.academic_year_id ? selected.academic_year_id : "",
  department_id: selected?.department_id ? selected.department_id : "",
  course_id: selected?.course_id ? selected.course_id : "",
  course_sem_id: selected?.course_sem_id ? selected.course_sem_id : "",
  day_number: selected?.day_number ? selected.day_number : "",
  dcya_id: selected?.dcya_id ? selected.dcya_id : "",
  time_slot_id: "",
  paper_id: "",
  teacher_id: "",
  time_slots: selected?.time_slots ? selected.time_slots : [],
});

const schema = timeTableSchema.omit([
  "_id",
  "added_by",
  "added_on",
  "is_active",
]);

const componentName = "Time Table";
const hookName = "timeTable";

const tableDataKeys = [
  "day_number",
  ({ academic_year_name, course_short_name, course_sem_name, division_name}:any)=> `${academic_year_name} ${course_short_name} ${course_sem_name} ${division_name}`,
  (item: any) => (
    <Table
      data={item?.time_slots}
      tableHeaders={["#", "Time Slot", "Paper", "Teacher"]}
      tableBodyKeys={[
        (_: any, index: number) => index + 1,
        ({ time_slot_name }: any) => time_slot_name,
        ({ paper_name, paper_code, is_break_slot }: any) =>
          !is_break_slot && `${paper_code} - ${paper_name}`,
        ({
          teacher_first_name,
          teacher_father_name,
          teacher_last_name,
          is_break_slot,
          break_name,
        }: any) =>
          is_break_slot
            ? break_name
            : `${teacher_last_name} ${teacher_first_name} ${teacher_father_name}`,
      ]}
    />
  ),
];

const tableHeaders = ["Day", "Class", "Schedule"];

const getDeleteContent = (item: any) => {
  return `${item?.time_slot_name} ${componentName}`;
};
