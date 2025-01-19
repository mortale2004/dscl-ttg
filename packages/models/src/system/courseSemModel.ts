import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { courseSemSchema } from "@dscl-ttg/types/system";

export const courseSemModel = generateModel(
  collections.system.masCourseSem,
  {
    course_sem_name: { type: String, required: true, unique: true },
    course_sem_number: { type: String, required: true },
  },
  courseSemSchema,
  true,
  true,
  true,
);
