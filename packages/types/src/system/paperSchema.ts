import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const paperSchema = object({
  paper_type_name: validate.requiredText("Paper Type"),
  paper_code: validate.requiredText("Paper Code"),
  course_id: validate.requiredText("Course"),
  course_sem_id: validate.requiredText("Semister"),
  ...schemaMetaData(true, true, true),
});

export type paperType = InferType<typeof paperSchema>;
