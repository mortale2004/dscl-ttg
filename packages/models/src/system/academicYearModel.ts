import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { academicYearSchema } from "@dscl-ttg/types/system";

export const academicYearModel = generateModel(
  collections.system.masAcademicYear,
  {
    academic_year_name: { type: String, required: true, unique: true },
    start_date: {type:Date, required: true},
    end_date: {type:Date, required: true},
    is_current:{type:Boolean, reuqired: true},
  },
  academicYearSchema,
  true,
  true,
  true,
);
