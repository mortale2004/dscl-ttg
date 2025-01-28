import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const timeSlotSchema = object({
    time_slot_name: validate.requiredText("Time Slot"),
    start_time: validate.requiredDate("Start Time"),
    end_time: validate.requiredDate("End Time"),
    is_break_slot: validate.requiredBoolean("Break Slot"),
    break_name: validate.text("Break Name"),
  ...schemaMetaData(true, true),
});

export type timeSlotType = InferType<typeof timeSlotSchema>;
