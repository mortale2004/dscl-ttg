import { moduleModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import { buildHierarchy } from "@dscl-ttg/utils";
import DBOperations from "src/das";

class moduleDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masModule);
  }
  isExists(payload: any) {
    const filter: any = {
      module_name: payload.module_name,
    };
    if (payload._id) {
      filter._id = { $ne: payload._id };
    }
    return super.isExists(filter);
  }
  async aggregate(
    filter?: any,
    sortBy?: any,
    skip?: number,
    limit?: number,
    options?: QueryOptions,
  ): Promise<any> {
    const response = await super.aggregate(
      [
        {
          $lookup: {
            from: collections.system.masModule,
            let: { id: "$_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$$id", "$parent_id"] } } }],
            as: "parentDetails",
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

    if (response && filter?.manualFilter?.group_data) {
      response[0].data = buildHierarchy(response[0].data, "_id", "parent_id");
    }

    return response;
  }
}

export default new moduleDas(model);
