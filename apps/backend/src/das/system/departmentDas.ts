import { departmentModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class departmentDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masDepartment);
  }
  isExists(payload: any) {
    const filter: any = {
      department_name: payload.department_name,
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

export default new departmentDas(model);
