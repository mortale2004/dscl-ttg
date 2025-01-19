import { generateController } from "@dscl-ttg/backend-utils";
import { divisionSchema } from "@dscl-ttg/types/system";
import divisionDas from "src/das/system/divisionDas";

export const divisionController = generateController({
  name: "Division",
  das: divisionDas,
  createSchema: divisionSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: divisionSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["division_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      division_name: 1,
    },
  },
});
