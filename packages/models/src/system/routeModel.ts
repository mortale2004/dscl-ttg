import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { routeSchema } from "@dscl-ttg/types/system";

export const routeModel = generateModel(
  collections.system.masRoute,
  {
    module_id: { type: String, required: true },
    route_name: { type: String, required: true, unique: true },
    ui_route: { type: String },
    api_route: { type: String },
    description: { type: String },
  },
  routeSchema,
  true,
  true,
  true,
);
