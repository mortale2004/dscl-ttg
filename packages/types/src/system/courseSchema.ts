import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const courseSchema = object({
  course_name: validate.requiredText("course"),
  course_short_name: validate.requiredText("Short Name"),
  ...schemaMetaData(true, true, true),
});

export type courseType = InferType<typeof courseSchema>;
