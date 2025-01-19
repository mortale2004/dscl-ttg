import { generateController } from "@dscl-ttg/backend-utils";
import { courseSemSchema } from "@dscl-ttg/types/system";
import courseSemDas from "src/das/system/courseSemDas";

export const courseSemController = generateController({
  name: "Course Sem",
  das: courseSemDas,
  createSchema: courseSemSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: courseSemSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["course_sem_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      course_sem_name: 1,
    },
  },
});
