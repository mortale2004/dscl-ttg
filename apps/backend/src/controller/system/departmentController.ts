import { generateController } from "@dscl-ttg/backend-utils";
import { departmentSchema } from "@dscl-ttg/types/system";
import departmentDas from "src/das/system/departmentDas";

export const departmentController = generateController({
  name: "Department",
  das: departmentDas,
  createSchema: departmentSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: departmentSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["department_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      department_name: 1,
    },
  },
});
