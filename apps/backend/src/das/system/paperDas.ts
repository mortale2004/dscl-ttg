import { paperModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class paperDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masPaper);
  }
  isExists(payload: any) {
    const filter: any = {
      $or: [

       { paper_name: payload.paper_name},
        {paper_code: payload.paper_code},
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
    return super.aggregate([
      {
        $lookup: {
          from: collections.system.masPaperType,
          let: { paperTypeId: "$paper_type_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$paperTypeId"] } } }],
          as: "paperTypeDetails",
        },
      },
      {
        $lookup: {
          from: collections.system.masCourse,
          let: { courseId: "$course_id" },
          pipeline: [{$match:{$expr:{$eq: ["$_id","$$courseId"]}}}],
          as: 'courseDetails',
        },
      },
      {
        $lookup: {
          from: collections.system.masCourseSem,
          let: { courseSemId: "$course_sem_id" },
          pipeline: [{$match:{$expr:{$eq: ["$_id","$$courseSemId"]}}}],
          as: 'courseSemDetails',
        },
      },
      {
        $project:{
          _id: 1,
          paper_name: 1,
          paper_code: 1,
          is_active: 1,
          paper_type_id: 1,
          paper_type_name: { $first: "$paperTypeDetails.paper_type_name" },
          course_id: 1,
          course_sem_id: 1,
          course_name:{$first:"$courseDetails.course_name"},
          course_sem_name: {$first:"$courseSemDetails.course_sem_name"},
        }
      }
    ], options, {
      filter,
      limit,
      sortBy,
      skip,
    });
  }
}

export default new paperDas(model);
