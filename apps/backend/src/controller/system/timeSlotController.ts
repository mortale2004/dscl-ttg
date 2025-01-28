import { generateController } from "@dscl-ttg/backend-utils";
import { timeSlotSchema } from "@dscl-ttg/types/system";
import timeSlotDas from "src/das/system/timeSlotDas";

export const timeSlotController = generateController({
  name: "Time Slot",
  das: timeSlotDas,
  createSchema: timeSlotSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: timeSlotSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["time_slot_name"],
  getListParams: {
    basicFilter: ["is_active"],
    sortBy: {
        time_slot_name: 1,
    },
  },
});
