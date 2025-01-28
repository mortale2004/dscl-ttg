import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { timeTableSchema } from "@dscl-ttg/types/system";

export const timeTableModel = generateModel(
  collections.system.timeTable,
  {
    day_number: {type:String, required: true},
    dcya_id: {type:String, required: true},
    time_slot_id: {type:String, required: true},
    paper_id: {type:String},
    teacher_id: {type:String},
  },
  timeTableSchema,
  true,
  true,
  true,
);
