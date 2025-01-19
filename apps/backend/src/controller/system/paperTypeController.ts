import { generateController } from "@dscl-ttg/backend-utils";
import { paperTypeSchema } from "@dscl-ttg/types/system";
import paperTypeDas from "src/das/system/paperTypeDas";

export const paperTypeController = generateController({
  name: "Paper Type",
  das: paperTypeDas,
  createSchema: paperTypeSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: paperTypeSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["paper_type_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      paper_type_name: 1,
    },
  },
});
