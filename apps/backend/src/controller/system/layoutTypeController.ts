import { generateController } from "@dscl-ttg/backend-utils";
import { layoutTypeSchema } from "@dscl-ttg/types/system";
import layoutTypeDas from "src/das/system/layoutTypeDas";

export const layoutTypeController = generateController({
  name: "Layout type",
  das: layoutTypeDas,
  createSchema: layoutTypeSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: layoutTypeSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["layout_type_name"],
  getListParams: {
    basicFilter: ["is_active"],
    sortBy: {
      layout_type_name: 1,
    },
  },
});
