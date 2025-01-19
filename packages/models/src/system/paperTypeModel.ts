import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { paperTypeSchema } from "@dscl-ttg/types/system";

export const paperTypeModel = generateModel(
  collections.system.masPaperType,
  {
    paper_type_name: { type: String, required: true, unique: true },
  },
  paperTypeSchema,
  true,
  true,
  true,
);
