import { generateController } from "@dscl-ttg/backend-utils";
import { dcyaMappingSchema } from "@dscl-ttg/types/system";
import dcyaMappingDas from "src/das/system/dcyaMappingDas";

export const dcyaMappingController = generateController({
  name: "Dcya Mapping",
  das: dcyaMappingDas,
  createSchema: dcyaMappingSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: dcyaMappingSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["division_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      course_name: 1,
      course_sem_number: 1,
      division_name: 1,
    },
  },
});
