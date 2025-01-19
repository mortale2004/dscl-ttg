import { academicYearModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class academicYearDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masAcademicYear);
  }
  isExists(payload: any) {
    const filter: any = {
      $or: [
        ...(payload.is_current ? [{is_current: payload.is_current}] : []),
        {academic_year_name: payload.academic_year_name},
      ]
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

export default new academicYearDas(model);
