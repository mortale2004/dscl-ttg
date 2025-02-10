import { timeTableModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";

class timeTableDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.timeTable);
  }
  isExists(payload: any) {
    const filter: any = {
      day_number: payload.day_number,
      dcya_id: payload.dcya_id,
      time_slot_id: payload.time_slot_id,
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
    options?: QueryOptions
  ) {
    return super.aggregate(
      [
        {
          $lookup: {
            from: collections.system.masTimeSlot,
            let: { timeSlotId: "$time_slot_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$timeSlotId"] } } },
            ],
            as: "timeSlotDetails",
          },
        },
        {
          $lookup: {
            from: collections.user.userRegistration,
            let: { teacherId: "$teacher_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$teacherId"] } } }],
            as: "teacherDetails",
          },
        },
        {
          $lookup: {
            from: collections.system.masPaper,
            let: { paperId: "$paper_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$paperId"] } } }],
            as: "paperDetails",
          },
        },
        {
          $group: {
            _id: {
              day_number: "$day_number",
              dcya_id: "$dcya_id",
            },
            time_slots: {
              $push: {
                teacher_id: "$teacher_id",
                time_slot_id: "$time_slot_id",
                paper_id: "$paper_id",
                time_slot_name: { $first: "$timeSlotDetails.time_slot_name" },
                break_name: { $first: "$timeSlotDetails.break_name" },
                start_time: { $first: "$timeSlotDetails.start_time" },
                end_time: { $first: "$timeSlotDetails.end_time" },
                is_break_slot: { $first: "$timeSlotDetails.is_break_slot" },
                teacher_first_name: { $first: "$teacherDetails.first_name" },
                teacher_last_name: { $first: "$teacherDetails.last_name" },
                teacher_father_name: { $first: "$teacherDetails.father_name" },
                paper_name: { $first: "$paperDetails.paper_name" },
              },
            },
          },
        },
        {
          $lookup: {
            from: collections.system.dcyaMapping,
            let: { dcyaId: "$_id.dcya_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$dcya_id", "$$dcyaId"] } } },
              {
                $lookup: {
                  from: collections.system.masCourse,
                  let: { courseId: "$course_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$courseId"] } } },
                  ],
                  as: "courseDetails",
                },
              },
              {
                $lookup: {
                  from: collections.system.masCourseSem,
                  let: { courseSemId: "$course_sem_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$courseSemId"] } } },
                  ],
                  as: "courseSemDetails",
                },
              },
              {
                $lookup: {
                  from: collections.system.masDivision,
                  let: { divisionId: "$division_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$divisionId"] } } },
                  ],
                  as: "divisionDetails",
                },
              },
              {
                $lookup: {
                  from: collections.system.masClassroom,
                  let: { classroomId: "$classroom_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$classroomId"] } } },
                  ],
                  as: "classroomDetails",
                },
              },
            ],
            as: "dcyaDetails",
          },
        },
        {
          $project: {
            day_number: "$_id.day_number",
            dcya_id: "$_id.dcya_id",
            time_slots: 1,
            division_name: {
              $first: { $first: "$dcyaDetails.divisionDetails.division_name" },
            },
            course_name: {
              $first: { $first: "$dcyaDetails.courseDetails.course_name" },
            },
            course_sem_name: {
              $first: {
                $first: "$dcyaDetails.courseSemDetails.course_sem_name",
              },
            },
            classroom_name: {
              $first: {
                $first: "$dcyaDetails.classroomDetails.classroom_name",
              },
            },
          },
        },
      ],
      options,
      {
        filter,
        limit,
        sortBy,
        skip,
      }
    );
  }
}

export default new timeTableDas(model);
