import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { timeTableSchema } from "@dscl-ttg/types/system";

export const timeTableModel = generateModel(
  collections.system.timeTable,
  {
    day_number: {type:String, required: true},
    dcya_id: {type:String, required: true},
    time_slots: {type:Array, min:1, required: true},
  },
  timeTableSchema,
  true,
  true,
);
