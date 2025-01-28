import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const timeTableSchema = object({
  day_number: validate.requiredNumber("Day Number"),
  dcya_id: validate.requiredText("Division"),
  time_slot_id: validate.requiredText("Time Slot"),
  paper_id: validate.text("Paper"),
  teacher_id: validate.text("Teacher"),
  ...schemaMetaData(true, true, true),
});

export type timeTableType = InferType<typeof timeTableSchema>;
