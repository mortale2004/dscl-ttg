import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const courseSemSchema = object({
    course_sem_name: validate.requiredText("Course Semister"),
    course_sem_number: validate.requiredNumber("Course Semister Number"),
  ...schemaMetaData(true, true, true),
});

export type courseSemType = InferType<typeof courseSemSchema>;
