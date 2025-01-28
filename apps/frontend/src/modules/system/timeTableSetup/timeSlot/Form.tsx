import { RadioButton, TextField, TimeField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {formatTime} from "@dscl-ttg/date-time"

type FormProps = {} & UseFormReturn;
const Form: React.FC<FormProps> = memo(({ watch, setValue }) => {
  const is_break_slot = String(watch("is_break_slot")) === "true";
  const start_time = watch("start_time");
  const end_time = watch("end_time");

  useEffect(()=>{
    if (start_time&&end_time){
      setValue("time_slot_name", `${formatTime(new Date(start_time))} - ${formatTime(new Date(end_time))}`);

    }
  },[start_time, end_time, setValue])
  return (
    <Fragment>
      <GridItem>
        <TextField
          label="Time Slot"
          name="time_slot_name"
          slotProps={timeSlotSlotProps}
        />
      </GridItem>
      <GridItem md={6}>
        <TimeField name="start_time" label="Start Time"  />
      </GridItem>
      <GridItem md={6}>
        <TimeField name="end_time" label="End Time"  />
      </GridItem>
      <GridItem>
        <RadioButton name="is_break_slot" label="Break Slot" />
      </GridItem>
      {is_break_slot && (
        <GridItem>
          <TextField
            label="Break Slot"
            name="break_slot_name"
            slotProps={timeSlotSlotProps}
          />
        </GridItem>
      )}
    </Fragment>
  );
});

export default Form;

const timeSlotSlotProps = {
  input: {
    readOnly: true,
  },
};
