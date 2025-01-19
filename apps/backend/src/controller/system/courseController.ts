import { generateController } from "@dscl-ttg/backend-utils";
import { courseSchema } from "@dscl-ttg/types/system";
import courseDas from "src/das/system/courseDas";

export const courseController = generateController({
  name: "Course",
  das: courseDas,
  createSchema: courseSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: courseSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["course_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      course_name: 1,
    },
  },
});
