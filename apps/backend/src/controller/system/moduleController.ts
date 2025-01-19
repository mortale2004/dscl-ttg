import { generateController } from "@dscl-ttg/backend-utils";
import { moduleSchema } from "@dscl-ttg/types/system";
import moduleDas from "src/das/system/moduleDas";

export const moduleController = generateController({
  name: "Module",
  das: moduleDas,
  createSchema: moduleSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: moduleSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["module_name"],
  getListParams: {
    basicFilter: ["is_active", "parent_id"],
    sortBy: {
      module_name: 1,
    },
  },
});
