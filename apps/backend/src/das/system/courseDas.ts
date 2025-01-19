import { courseModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class courseDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masCourse);
  }
  isExists(payload: any) {
    const filter: any = {
      course_name: payload.course_name,
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
    return super.aggregate([], options, {
      filter,
      limit,
      sortBy,
      skip,
    });
  }
}

export default new courseDas(model);
