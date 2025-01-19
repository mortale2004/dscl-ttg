import { Schema } from "yup";

export const validatePayload = (
  data: any,
  schema: Schema,
  options: any = {
    abortEarly: false,
  }
) => {
  try {
    return schema.validateSync(data, options);
  } catch (error: any) {
    throw new Error(error.errors?.join(","));
  }
};
