import { schemaMetaData, validate } from "src/utils/validation";
import { array, InferType, object, string } from "yup";

export const userRegistrationSchema = object({
  username: validate.requiredText("User Name"),
  password: validate.requiredText("Password"),
  first_name: validate.requiredText("First Name"),
  last_name: validate.requiredText("Last Name"),
  father_name: validate.requiredText("Father Name"),
  primary_contact: validate.requiredMobile(),
  secondary_contact: validate.mobile(),
  photo_url: validate.text("Photo"),
  email_address: validate.email(),
  gender_name: validate.requiredText("Gender"),
  date_of_birth: validate.requiredDate("Date of Birth"),
  user_role_id: validate.requiredText("Role"),
  is_deleted: validate.requiredBoolean("Deleted"),
  paper_ids: array(string()),
  ...schemaMetaData(true, true, true),
});

export type userRegistrationType = InferType<typeof userRegistrationSchema>;