import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { moduleSchema } from "@dscl-ttg/types/system";

export const moduleModel = generateModel(
  collections.system.masModule,
  {
    module_name: { type: String, required: true, unique: true },
    parent_id: { type: String },
  },
  moduleSchema,
  true,
  true,
  true,
);
