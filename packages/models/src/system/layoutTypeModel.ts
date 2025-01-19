import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { layoutTypeSchema } from "@dscl-ttg/types/system";

export const layoutTypeModel = generateModel(
  collections.system.masLayoutType,
  {
    layout_type_name: { type: String, required: true, unique: true },
  },
  layoutTypeSchema,
  true,
  true,
  true,
);
