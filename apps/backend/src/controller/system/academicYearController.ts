import { generateController } from "@dscl-ttg/backend-utils";
import { academicYearSchema } from "@dscl-ttg/types/system";
import academicYearDas from "src/das/system/academicYearDas";

export const academicYearController = generateController({
  name: "AcademicYear",
  das: academicYearDas,
  createSchema: academicYearSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: academicYearSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["academic_year_name"],
  getListParams: {
    basicFilter: ["is_active", ],
    sortBy: {
      academic_year_name: 1,
    },
  },
});
