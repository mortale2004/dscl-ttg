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
  user_uid: validate.text("User UID"),
  aadhar_number: validate.aadhar(),
  email_address: validate.email(),
  gender_name: validate.requiredText("Gender"),
  date_of_birth: validate.requiredDate("Date of Birth"),
  user_role_ids: array().of(string()).min(1, "Add min one role"),
  is_deleted: validate.requiredBoolean("Deleted"),
  ...schemaMetaData(true, true, true),
});

export type userRegistrationType = InferType<typeof userRegistrationSchema>;

export const jobSeekerRegistrationSchema = userRegistrationSchema.omit([
  "is_deleted",
  "user_role_ids",
  "username",
  "password",
  "user_uid",
  "added_by",
  "added_on",
]);

export type jobSeekerRegistrationType = InferType<
  typeof jobSeekerRegistrationSchema
>;
