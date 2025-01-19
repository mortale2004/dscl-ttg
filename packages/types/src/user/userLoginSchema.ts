import { validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const userLoginSchema = object({
  user_id: validate.requiredText("User"),
  access_token: validate.requiredText("Access Token"),
  refresh_token: validate.requiredText("Refresh Token"),
  user_role_name: validate.requiredText("Role"),
});

export type userLoginType = InferType<typeof userLoginSchema>;

export const userLoginPayloadSchema = object({
  username: validate.requiredText("Username"),
  password: validate.requiredText("Password"),
});

export type userLoginPayloadType = InferType<typeof userLoginPayloadSchema>;
