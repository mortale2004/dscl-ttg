import { dcyaMappingModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class dcyaMappingDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masDcyaMapping);
  }
  isExists(payload: any) {
    const filter: any = {
      academic_year_id: payload.academic_year_id,
      course_id: payload.course_id,
      course_sem_id: payload.course_sem_id,
      division_id: payload.division_id,
      department_id: payload.department_id,
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
            from: collections.system.masCourse,
            let: { courseId: "$course_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$courseId"] } } }],
            as: "courseDetails",
          },
        },
        {
          $lookup: {
            from: collections.system.masCourseSem,
            let: { courseSemId: "$course_sem_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$courseSemId"] } } }],
            as: "courseSemDetails",
          },
        },
        {
          $lookup:{
            from:collections.system.masDivision,
            let: { divisionId: "$division_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$divisionId"] } } }],
            as: "divisionDetails",
          }
        },
        {
          $lookup: {
            from: collections.system.masClassroom,
            let: { classroomId: "$classroom_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$classroomId"] } } }],
            as: "classroomDetails",
          },
        },
        {
          $project:{
            academic_year_id: 1,
            course_id: 1,
            course_sem_id: 1,
            division_id: 1,
            department_id: 1,
            classroom_id: 1,
            is_active: 1,

            classroom_name: { $first: "$classroomDetails.classroom_name" },
            course_name: { $first: "$courseDetails.course_name" },
            course_sem_name: { $first: "$courseSemDetails.course_sem_name" },
            division_name: { $first: "$divisionDetails.division_name" },
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

export default new dcyaMappingDas(model);
