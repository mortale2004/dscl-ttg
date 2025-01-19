import { userLoginModel as model } from "@dscl-ttg/models/user";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class userLoginDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.user.userLogin);
  }
  aggregate(filter?: any) {
    return super.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: collections.system.masUserRole,
          let: { userRoles: "$user_role_ids" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$userRoles"] } } }],
          as: "userRoleDetails",
        },
      },
    ]);
  }
}

export default new userLoginDas(model);
