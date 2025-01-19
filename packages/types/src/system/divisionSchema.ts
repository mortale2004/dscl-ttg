import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const divisionSchema = object({
    division_name: validate.requiredText("Division"),
  ...schemaMetaData(true, true, true),
});

export type divisionType = InferType<typeof divisionSchema>;
