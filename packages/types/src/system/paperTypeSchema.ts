import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const paperTypeSchema = object({
  paper_type_name: validate.requiredText("Paper Type"),
  ...schemaMetaData(true, true, true),
});

export type paperTypeType = InferType<typeof paperTypeSchema>;
