import { generateController, requestHandlingWrapper, validatePayload } from "@dscl-ttg/backend-utils";
import { timeTableSchema } from "@dscl-ttg/types/system";
import timeTableDas from "src/das/system/timeTableDas";

export const timeTableController = generateController({
  name: "Time Slot",
  das: timeTableDas,
  addMetaData: true,
  searchableFields: ["time_slot_name"],
  getListParams: {
    basicFilter: ["is_active"],
    sortBy: {
        time_slot_name: 1,
    },
  },
  createHandler: ()=> requestHandlingWrapper(async (req, res) => {
    const payload = await validatePayload(req.body.formData, timeTableSchema.omit(["_id", "added_by", "added_on"]));
    







  })
});
