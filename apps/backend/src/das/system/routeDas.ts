import { routeModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class routeDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masRoute);
  }
  isExists(payload: any) {
    const filter: any = {
      $or: [
        { route_name: payload.route_name },
        ...(payload.ui_route ? [{ ui_route: payload.ui_route }] : []),
        ...(payload.api_route ? [{ api_route: payload.api_route }] : []),
      ],
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
    return super.aggregate(
      [
        {
          $lookup: {
            from: collections.system.masModule,
            let: { moduleId: "$module_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$moduleId"] } } }],
            as: "moduleDetails",
          },
        },
        {
          $project: {
            _id: 1,
            ui_route: 1,
            api_route: 1,
            description: 1,
            route_name: 1,
            is_active: 1,
            module_id: 1,
            module_name: { $first: "$moduleDetails.module_name" },
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

export default new routeDas(model);
