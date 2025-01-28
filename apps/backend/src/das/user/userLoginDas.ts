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
    ]);
  }
}

export default new userLoginDas(model);
