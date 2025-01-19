import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { userRolePermissionSchema } from "@dscl-ttg/types/system";

export const userRolePermissionModel = generateModel(
  collections.system.masUserRolePermission,
  {
    route_id: { type: String, required: true },
    user_role_id: { type: String, required: true },
    permissions: { type: Array, default: [] },
  },
  userRolePermissionSchema,
  true,
  true,
);
