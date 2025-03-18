import { BadRequestError, generateController, requestHandlingWrapper, responseUtil, validatePayload } from "@dscl-ttg/backend-utils";
import { getIndianDateTime } from "@dscl-ttg/date-time";
import { timeTableSchema } from "@dscl-ttg/types/system";
import { get } from "lodash";
import timeTableDas from "src/das/system/timeTableDas";

export const timeTableController = generateController({
  name: "Time Slot",
  das: timeTableDas,
  addMetaData: true,
  searchableFields: ["time_slot_name"],
  getListParams: {
    basicFilter: ["day_number", "dcya_id"],
    manualFilter: ["teacher_id", "time_slot_id","group_by"],
    sortBy: {
        time_slot_name: 1,
    },
  },
  createHandler: ()=> requestHandlingWrapper(async (req, res) => {
    const payload = await validatePayload(req.body.formData, timeTableSchema.omit(["_id", "added_by", "added_on"]));


    const isExists = await timeTableDas.isExists(payload)

    if (isExists){
      throw new BadRequestError("Time table already exists!")
    }

    const slots:any[] = []
    for (const slot of payload.time_slots) {

      const [isBusy] = await timeTableDas.aggregate({
        basicFilter:{

          day_number: payload.day_number,
        },
        manualFilter:{
          time_slot_id: slot.time_slot_id,
          teacher_id: slot.teacher_id,
        }
      })

      if (isBusy?.data?.[0]){
        throw new BadRequestError(`Teacher ${slot?.teacher_first_name} ${slot?.teacher_father_name} is busy on ${slot?.time_slot_name}`);
      }

      slots.push({
        time_slot_id: slot.time_slot_id,
        teacher_id: slot.teacher_id,
        paper_id: slot.paper_id
      })
    }

    payload.time_slots = slots;
    payload.added_by =  (req as any)?.context?.user._id;
    payload.added_on = getIndianDateTime();

    const [insertResponse] = await timeTableDas.insertOne(payload, {});

    if (!insertResponse){
      throw new BadRequestError("Error while creating time table!");
    }

    const [response] = await timeTableDas.aggregate({
      basicFilter:{
        _id: insertResponse._id
      }
    });

    responseUtil.createWithGet(response, res, "Time table created successfullly!")

  }),


  updateHandler: ()=> requestHandlingWrapper(async (req, res) => {
    const payload = await validatePayload(req.body.formData, timeTableSchema.omit(["added_by", "added_on"]));


    const isExists = await timeTableDas.isExists(payload)

    if (isExists){
      throw new BadRequestError("Time table already exists!")
    }

    const slots:any[] = []
    for (const slot of payload.time_slots) {

      const [isBusy] = await timeTableDas.aggregate({
        basicFilter:{
          _id: {$ne:payload._id},
          day_number: payload.day_number,
        },
        manualFilter:{
          time_slot_id: slot.time_slot_id,
          teacher_id: slot.teacher_id,
        }
      })

      if (isBusy?.data?.[0]){
        throw new BadRequestError(`Teacher ${slot?.teacher_first_name} ${slot?.teacher_father_name} is busy on ${slot?.time_slot_name}`);
      }

      slots.push({
        time_slot_id: slot.time_slot_id,
        teacher_id: slot.teacher_id,
        paper_id: slot.paper_id
      })
    }

    payload.time_slots = slots;
    payload.modified_by =  (req as any)?.context?.user._id;
    payload.modified_on = getIndianDateTime();

    const updateResponse = await timeTableDas.updateRecord({_id: payload._id},payload, {});

    if (!updateResponse){
      throw new BadRequestError("Error while creating time table!");
    }

    const [response] = await timeTableDas.aggregate({
      basicFilter:{
        _id: (updateResponse as any)._id
      }
    });

    responseUtil.updateWithGet(response, res, "Time table updated successfullly!")

  })
});
