import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const layoutTypeSchema = object({
  layout_type_name: validate
    .requiredText("Layout Type")
    .oneOf(["ADMIN", "STUDENT", "PUBLIC", "CUSTOMER"]),
  ...schemaMetaData(true, true, true),
});

export type layoutTypeType = InferType<typeof layoutTypeSchema>;
