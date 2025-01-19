import { generateController } from "@dscl-ttg/backend-utils";
import { userRolePermissionSchema } from "@dscl-ttg/types/system";
import { USER_CONSTANTS } from "@dscl-ttg/constants";
import userRolePermissionDas from "src/das/system/userRolePermissionDas";
import userRoleDas from "src/das/system/userRoleDas";

export const userRolePermissionController = generateController({
  name: "User Role Permission",
  das: userRolePermissionDas,
  createSchema: userRolePermissionSchema.omit([
    "_id",
    "modified_by",
    "modified_on",
  ]),
  updateSchema: userRolePermissionSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: [],
  getListParams: {
    handleFilters: async (user: any, query: any, filter: any) => {
      if (user?.user_role_name != USER_CONSTANTS.USER_ROLE.SUPER_ADMIN) {
        const [userRoles] = await userRoleDas.aggregate({
          basicFilter: {
            user_role_weight: { $gt: Number(user?.user_role_weight) },
          },
        });

        filter.basicFilter.user_role_id = {
          $in: userRoles?.data?.map((userRole: any) => userRole._id),
        };
      }
    },
    basicFilter: ["user_role_id", "route_id"],
    manualFilter: ["build_hierarchy"],
    sortBy: {
      module_name: 1,
    },
  },
});
