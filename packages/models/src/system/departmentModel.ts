import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { departmentSchema } from "@dscl-ttg/types/system";

export const departmentModel = generateModel(
  collections.system.masDepartment,
  {
    department_name: { type: String, required: true, unique: true },
    department_short_name: { type: String, required: true },
  },
  departmentSchema,
  true,
  true,
  true,
);
