import { collections } from "src/constants";
import { generateModel } from "src/utils/mongoDB";
import { userLoginSchema } from "@dscl-ttg/types/user";

export const userLoginModel = generateModel(
  collections.user.userLogin,
  {
    user_id: { type: String, required: true, unique: true },
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    user_role_name: { type: String, required: true },
  },
  userLoginSchema,
);
