import { timeTableModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";


const getDcyaData = (dcya_id_key: string)=> [ {
  $lookup: {
    from: collections.system.dcyaMapping,
    let: { dcyaId: dcya_id_key },
    pipeline: [
      { $match: { $expr: { $eq: ["$_id", "$$dcyaId"] } } },
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
      {
        $lookup: {
          from: collections.system.masAcademicYear,
          let: { academicYearId: "$academic_year_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$academicYearId"] } } },
          ],
          as: "academicYear",
        },
      },
    ],
    as: "dcyaDetails",
  },
},];

const dcyaProjection = {
  academic_year_id: {
    $first: "$dcyaDetails.academic_year_id",
  },
  department_id: {
    $first: "$dcyaDetails.department_id",
  },
  course_id: {
    $first: "$dcyaDetails.course_id",
  },
  course_sem_id: {
    $first: "$dcyaDetails.course_sem_id",
  },

  academic_year_name: {
    $first: "$dcyaDetails.academicYear.academic_year_name",
  },
  division_name: {
    $first: { $first: "$dcyaDetails.divisionDetails.division_name" },
  },
  course_short_name: {
    $first: { $first: "$dcyaDetails.courseDetails.course_short_name" },
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
}

class timeTableDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masTimeTable);
  }
  isExists(payload: any) {
    const filter: any = {
      day_number: payload.day_number,
      dcya_id: payload.dcya_id,
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
          $unwind: {
            path:"$time_slots",
          }
        },

        ...(filter?.manualFilter?.time_slot_id
          ? [
            {
              $match:{
                $expr:{
                  $eq:["$time_slots.time_slot_id",filter.manualFilter.time_slot_id]
                }
              }
            }
        ] :[]),


        ...(filter?.manualFilter?.teacher_id
          ? [
            {
              $match:{
                $expr:{
                  $eq:["$time_slots.teacher_id",filter.manualFilter.teacher_id]
                }
              }
            }
        ] :[]),


        {
          $lookup: {
            from: collections.system.masTimeSlot,
            let: { timeSlotId: "$time_slots.time_slot_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$timeSlotId"] } } },
            ],
            as: "timeSlotDetails",
          },
        },
        {
          $lookup: {
            from: collections.user.userRegistration,
            let: { teacherId: "$time_slots.teacher_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$teacherId"] } } }],
            as: "teacherDetails",
          },
        },
        {
          $lookup: {
            from: collections.system.masPaper,
            let: { paperId: "$time_slots.paper_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$paperId"] } } }],
            as: "paperDetails",
          },
        },
        {
          $group: {
            _id: "$_id",
            day_number: {$first:"$day_number"},
            dcya_id: {$first:"$dcya_id"},
            time_slots: {
              $push: {
                teacher_id: "$time_slots.teacher_id",
                time_slot_id: "$time_slots.time_slot_id",
                paper_id: "$time_slots.paper_id",
                time_slot_name: { $first: "$timeSlotDetails.time_slot_name" },
                break_name: { $first: "$timeSlotDetails.break_name" },
                start_time: { $first: "$timeSlotDetails.start_time" },
                end_time: { $first: "$timeSlotDetails.end_time" },
                is_break_slot: { $first: "$timeSlotDetails.is_break_slot" },
                teacher_first_name: { $first: "$teacherDetails.first_name" },
                teacher_last_name: { $first: "$teacherDetails.last_name" },
                teacher_father_name: { $first: "$teacherDetails.father_name" },
                paper_name: { $first: "$paperDetails.paper_name" },
                paper_code: { $first: "$paperDetails.paper_code" },
              },
            },
          },
        },
       

        ...(filter?.manualFilter?.group_by ==="dcya_id" ? [
          {
            $sort:{
              day_number: 1,
            }
          },
          {
            $group:{
              _id: "$dcya_id",
              time_tables: {
                $push: "$$ROOT",
              }
            }
          },
          ...getDcyaData("$_id"),
          {
            $project: {
              _id: 1,
              time_tables: 1,
              ...dcyaProjection
            }
          }

        ]: [
          ...getDcyaData("$dcya_id"),

          {
            $project: {
              _id: 1,
              day_number: "$day_number",
              dcya_id: "$dcya_id",
              time_slots: 1,
              ...dcyaProjection
            },
          },
        ]),
      
      
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
