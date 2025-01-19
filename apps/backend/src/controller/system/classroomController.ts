import { generateController } from "@dscl-ttg/backend-utils";
import { classroomSchema } from "@dscl-ttg/types/system";
import classroomDas from "src/das/system/classroomDas";

export const classroomController = generateController({
  name: "Classroom",
  das: classroomDas,
  createSchema: classroomSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: classroomSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["classroom_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      classroom_name: 1,
    },
  },
});
