import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const classroomSchema = object({
  classroom_name: validate.requiredText("classroom"),
  floor_number: validate.requiredText("Floor"),
  ...schemaMetaData(true, true, true),
});

export type classroomType = InferType<typeof classroomSchema>;
