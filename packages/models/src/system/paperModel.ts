import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { paperSchema } from "@dscl-ttg/types/system";

export const paperModel = generateModel(
  collections.system.masPaper,
  {
    paper_name: { type: String, required: true, unique: true },
    paper_code: { type: String, required: true },
    paper_type_id: { type: String, required: true},
    course_id: { type: String, required: true},
    course_sem_id: { type: String, required: true},
  },
  paperSchema,
  true,
  true,
  true,
);
