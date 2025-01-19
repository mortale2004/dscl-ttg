import { schemaMetaData, validate } from "src/utils/validation";
import { array, InferType, object, string } from "yup";

export const userRolePermissionSchema = object({
  route_id: validate.requiredText("Route"),
  user_role_id: validate.requiredText("Role"),
  permissions: array().of(string()).required("Permissions"),
  ...schemaMetaData(true, true),
});

export type userRolePermissionType = InferType<typeof userRolePermissionSchema>;
