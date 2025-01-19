import { userRegistrationModel as model } from "@dscl-ttg/models/user";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class userRegistrationDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.user.masUserRegistration);
  }
  isExists(payload: any) {
    const filter: any = {
      $or: [
        {
          $and: [
            { first_name: payload.first_name },
            { father_name: payload.father_name },
            { last_name: payload.last_name },
          ],
        },
        ...(payload.aadhar_number
          ? [{ aadhar_number: payload.aadhar_number }]
          : []),
        ...(payload.email_address
          ? [{ email_address: payload.email_address }]
          : []),
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
            from: collections.system.masUserRole,
            let: { userRoles: "$user_role_ids" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$userRoles"] } } },
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
                  layout_type_name: {
                    $first: "$layoutTypeDetails.layout_type_name",
                  },
                  user_role_name: 1,
                  user_role_weight: 1,
                },
              },
            ],
            as: "userRoleDetails",
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

export default new userRegistrationDas(model);
