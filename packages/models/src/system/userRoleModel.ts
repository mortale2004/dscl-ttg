import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { userRoleSchema } from "@dscl-ttg/types/system";

export const userRoleModel = generateModel(
  collections.system.masUserRole,
  {
    user_role_name: { type: String, required: true, unique: true },
    user_role_weight: { type: Number, required: true, unique: true },
    layout_type_id: { type: String, required: true },
  },
  userRoleSchema,
  true,
  true,
  true,
);
