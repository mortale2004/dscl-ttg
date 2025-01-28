import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { timeSlotSchema } from "@dscl-ttg/types/system";

export const timeSlotModel = generateModel(
  collections.system.masTimeSlot,
  {
    time_slot_name: { type: String, required: true, unique: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    is_break_slot: { type: Boolean, required: true },
    break_name: { type: String },
  },
  timeSlotSchema,
  true,
  true,
  true,
);
