import { generateController } from "@dscl-ttg/backend-utils";
import { userRegistrationSchema } from "@dscl-ttg/types/user";
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
    basicFilter: ["is_active"],
    sortBy: {
      last_name: 1,
      first_name: 1,
      father_name: 1,
    },
  },
});
