import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { timeSlotSchema } from "@dscl-ttg/types/system";
import BasicFilterForm from "./FilterForm/BasicFilterForm";
import Container from "@dscl-ttg/ui/Container";

const TimeSlot = () => {
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
      />
      </Container>
  );
};

export default TimeSlot;

const headerProps = {
  hasExportButton: false,
  hasPrintButton: false,
  hasComponentName: false,
  hasFiltersForm: true,
  filterFormProps: {
    BasicFilterForm: BasicFilterForm,
    getFilters: (selected: any) => ({
      is_break_slot: selected && "is_break_slot" in selected ? selected.is_break_slot : "",
    }),
  },
};

const getDefaultValues = (selected: any, mode: CrudDialogMode) => ({
  _id: mode === "update" ? selected?._id : "",
  time_slot_name: selected?.time_slot_name ? selected.time_slot_name : "",
  start_time: selected?.start_time ? selected.start_time : null,
  end_time: selected?.end_time ? selected.end_time : null,
  break_name: selected?.break_name ? selected.break_name : "",
  is_break_slot: selected && "is_break_slot" in selected ? selected.is_break_slot : false,
});

const schema = timeSlotSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "Time Slot";
const hookName = "timeSlot";

const tableDataKeys = [({time_slot_name}:any)=> time_slot_name, "start_time", "end_time", "break_name",  "is_break_slot"];

const tableHeaders = ["Time Slot", "Start Time", "End Time", "Break", "Break Slot"];

const getDeleteContent = (item: any) => {
  return `${item?.time_slot_name} ${componentName}`;
};
