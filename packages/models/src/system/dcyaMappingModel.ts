import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { dcyaMappingSchema } from "@dscl-ttg/types/system";

export const dcyaMappingModel = generateModel(
  collections.system.dcyaMapping,
  {
    academic_year_id: { type: String, required: true },
    course_id: { type: String, required: true },
    course_sem_id: { type: String, required: true },
    department_id: { type: String, required: true },
    division_id: { type: String, required: true },
    classroom_id: { type: String, required: true },
    paper_ids: { type: Array, default: [] },
  },
  dcyaMappingSchema,
  true,
  true,
  true,
);
