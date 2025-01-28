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
            let: { userRole: "$user_role_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$userRole"] } } },
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
        {
          $lookup: {
            from: collections.system.masPaper,
            let: { paperIds: "$paper_ids" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$paperIds"] } } },
              {
                $lookup: {
                  from: collections.system.masPaperType,
                  let: { paperTypeId: "$paper_type_id" },
                  pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$paperTypeId"] } } }],
                  as: "paperTypeDetails",
                },
              },
              {
                $project: {
                  _id: 1,
                  paper_name:1,
                  paper_code:1,
                  paper_type_id: 1,
                  paper_type_name: { $first: "$paperTypeDetails.paper_type_name" },
                },
              }
            ],
            as: "papers",
          },
        },
        {
          $project: {
            first_name: 1,
            username: 1,
            password: 1,
            last_name: 1,
            father_name: 1,
            primary_contact: 1,
            secondary_contact: 1,
            photo_url: 1,
            email_address: 1,
            gender_name: 1,
            date_of_birth: 1,
            user_role_id: 1,
            is_deleted: 1,
            _id: 1,
            user_role_name: { $first: "$userRoleDetails.user_role_name" },
            layout_type_id: 1,
            layout_type_name: {
              $first: "$userRoleDetails.layout_type_name",
            },
            is_active: 1,
            papers: 1,
            paper_ids:1,
          },
        }
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
