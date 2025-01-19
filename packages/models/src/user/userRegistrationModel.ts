import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { userRegistrationSchema } from "@dscl-ttg/types/user";

export const userRegistrationModel = generateModel(
  collections.user.userRegistration,
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    father_name: { type: String, required: true },
    primary_contact: { type: String, required: true },
    secondary_contact: { type: String },
    email_address: { type: String },
    gender_name: { type: String, required: true },
    date_of_birth: { type: Date },
    user_role_ids: { type: Array, required: true },
    is_deleted: { type: Boolean, required: true },
    photo_url: { type: String },
  },
  userRegistrationSchema,
  true,
  true,
  true,
);
