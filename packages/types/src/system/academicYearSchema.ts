import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const academicYearSchema = object({
  academic_year_name: validate.requiredText("Academic Year"),
  start_date: validate.requiredDate("Start Date"),
  end_date: validate.requiredDate("End Date").test("match", "End date should be greater", function(end_date){
    if (end_date && this.parent.start_date){
        return new Date(this.parent.start_date).getTime() <= new Date(end_date).getTime();
    }
    return true;
  }),
  is_current: validate.requiredBoolean("Current Academic Year"),
  ...schemaMetaData(true, true, true),
});

export type academicYearType = InferType<typeof academicYearSchema>;
