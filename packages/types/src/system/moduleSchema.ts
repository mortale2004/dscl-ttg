import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const moduleSchema = object({
  module_name: validate.requiredText("Module"),
  parent_id: validate
    .text("Parent")
    .test(
      "match",
      "Parent Id Cannot be same as Module Id",
      function (parent_id) {
        if (parent_id) {
          return this.parent._id != parent_id;
        }
        return true;
      },
    ),
  ...schemaMetaData(true, true, true),
});

export type moduleType = InferType<typeof moduleSchema>;
