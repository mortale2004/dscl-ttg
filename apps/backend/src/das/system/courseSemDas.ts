import { courseSemModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class courseSemDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masCourseSem);
  }
  isExists(payload: any) {
    const filter: any = {
      course_sem_name: payload.course_sem_name,
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

export default new courseSemDas(model);
