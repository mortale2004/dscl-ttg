import { schemaMetaData, validate } from "src/utils/validation";
import { array, InferType, object } from "yup";

export const timeTableSchema = object({
  dcya_id: validate.requiredText("Division"),
  day_number: validate.requiredText("Day"),
  time_slots: array().of(object({
    time_slot_id: validate.requiredText("Time Slot"),
    paper_id: validate.text("Paper"),
    teacher_id: validate.text("Teacher"),
  })).required("Time slot").min(1, "Please add min 1 slot!"),
  ...schemaMetaData(true, true),
});

export type timeTableType = InferType<typeof timeTableSchema>;