import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const userRoleSchema = object({
  user_role_name: validate.requiredText("Role"),
  user_role_weight: validate.requiredNumber("Role Weight"),
  layout_type_id: validate.requiredText("Layout Type"),
  ...schemaMetaData(true, true, true),
});

export type userRoleType = InferType<typeof userRoleSchema>;
