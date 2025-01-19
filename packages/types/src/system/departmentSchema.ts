import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const departmentSchema = object({
  department_name: validate.requiredText("Department"),
  department_short_name: validate.requiredText("Short Name"),
  ...schemaMetaData(true, true, true),
});

export type departmentType = InferType<typeof departmentSchema>;
