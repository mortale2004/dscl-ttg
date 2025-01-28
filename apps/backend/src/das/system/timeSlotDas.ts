import { timeSlotModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class timeSlotDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masTimeSlot);
  }
  isExists(payload: any) {
    const filter: any = {
      time_slot_name: payload.time_slot_name,
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

export default new timeSlotDas(model);
