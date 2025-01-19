import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const dcyaMappingSchema = object({
    academic_year_id: validate.requiredText("Year"),
    course_id: validate.requiredText("Course"),
    course_sem_id: validate.requiredText("Course Sem"),
    department_id: validate.requiredText("Department"),
    division_id: validate.requiredText("Division"),
    classroom_id: validate.requiredText("Classroom"),
  ...schemaMetaData(true, true, true),
});

export type dcyaMappingType = InferType<typeof dcyaMappingSchema>;
