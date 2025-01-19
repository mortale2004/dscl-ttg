import { userRoleModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class userRoleDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masUserRole);
  }
  isExists(payload: any) {
    const filter: any = {
      $or: [
        { user_role_name: payload.user_role_name },
        { user_role_weight: payload.user_role_weight },
      ],
    };
    if (payload._id) {
      filter._id = { $ne: payload._id };
    }
    return super.isExists(filter);
  }
  aggregate(
    filter?: any,
    sortBy?: any,
    skip?: number,
    limit?: number,
    options?: QueryOptions,
  ) {
    return super.aggregate(
      [
        {
          $lookup: {
            from: collections.system.masLayoutType,
            let: { layoutTypeId: "$layout_type_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$layoutTypeId"] } } },
            ],
            as: "layoutTypeDetails",
          },
        },
        {
          $project: {
            _id: 1,
            layout_type_id: 1,
            layout_type_name: { $first: "$layoutTypeDetails.layout_type_name" },
            user_role_name: 1,
            user_role_weight: 1,
            is_active: 1,
          },
        },
      ],
      options,
      {
        filter,
        limit,
        sortBy,
        skip,
      },
    );
  }
}

export default new userRoleDas(model);
