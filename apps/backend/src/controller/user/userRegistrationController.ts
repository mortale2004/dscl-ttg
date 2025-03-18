import { BadRequestError, generateController } from "@dscl-ttg/backend-utils";
import { userRegistrationSchema } from "@dscl-ttg/types/user";
import userRoleDas from "src/das/system/userRoleDas";
import userRegistrationDas from "src/das/user/userRegistrationDas";

export const userRegistrationController = generateController({
  name: "User",
  das: userRegistrationDas,
  createSchema: userRegistrationSchema.omit([
    "_id",
    "modified_by",
    "modified_on",
  ]),
  updateSchema: userRegistrationSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["first_name", "last_name", "email_address"],
  getListParams: {
    handleFilters: async (user: any, query: any, filter: any) => {
      if (query?.user_role_name){
        const role : any = await userRoleDas.getRecord({user_role_name: query.user_role_name});
        if (!role){
          throw new BadRequestError("Error while getting data! User Role not Found!")
        }
        filter.basicFilter.user_role_id = role._id
      }
      if (query?.paper_id){
        filter.basicFilter.paper_ids = {$in: [query.paper_id]};
      }
    },
    basicFilter: ["is_active"],
    sortBy: {
      last_name: 1,
      first_name: 1,
      father_name: 1,
    },
  },
});
