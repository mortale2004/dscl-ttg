import { generateController } from "@dscl-ttg/backend-utils";
import { paperSchema } from "@dscl-ttg/types/system";
import paperDas from "src/das/system/paperDas";

export const paperController = generateController({
  name: "Paper",
  das: paperDas,
  createSchema: paperSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: paperSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["paper_name", "paper_code"],
  getListParams: {
    basicFilter: ["is_active", "paper_type_id", "course_id", "course_sem_id"],
    sortBy: {
        paper_code: 1,
    },
  },
});
