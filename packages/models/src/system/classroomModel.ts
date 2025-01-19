import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { classroomSchema } from "@dscl-ttg/types/system";

export const classroomModel = generateModel(
  collections.system.masClassroom,
  {
    classroom_name: { type: String, required: true, unique: true },
    floor_number: { type: String, required: true },
  },
  classroomSchema,
  true,
  true,
  true,
);
