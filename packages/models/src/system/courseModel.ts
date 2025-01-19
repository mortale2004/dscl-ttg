import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { courseSchema } from "@dscl-ttg/types/system";

export const courseModel = generateModel(
  collections.system.masCourse,
  {
    course_name: { type: String, required: true, unique: true },
    course_short_name: { type: String, required: true },
  },
  courseSchema,
  true,
  true,
  true,
);
