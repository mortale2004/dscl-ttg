import { generateController } from "@dscl-ttg/backend-utils";
import { userRoleSchema } from "@dscl-ttg/types/system";
import { USER_CONSTANTS } from "@dscl-ttg/constants";
import userRoleDas from "src/das/system/userRoleDas";

export const userRoleController = generateController({
  name: "User Role",
  das: userRoleDas,
  createSchema: userRoleSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: userRoleSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["user_role_name"],
  getListParams: {
    handleFilters: (user: any, query: any, filter: any) => {
      if (String(query?.skip_role_weight) !== "true") {
        if (
          user?.role_weight &&
          user?.user_role_name != USER_CONSTANTS.USER_ROLE.SUPER_ADMIN
        ) {
          filter.basicFilter.user_role_weight = {
            $gt: Number(user?.role_weight),
          };
        }
      }
    },
    basicFilter: ["is_active", "layout_type_id"],
    sortBy: {
      user_role_weight: 1,
    },
  },
});
