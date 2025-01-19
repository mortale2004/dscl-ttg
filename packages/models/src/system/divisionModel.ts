import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { divisionSchema } from "@dscl-ttg/types/system";

export const divisionModel = generateModel(
  collections.system.masDivision,
  {
    division_name: { type: String, required: true, unique: true },
  },
  divisionSchema,
  true,
  true,
  true,
);
