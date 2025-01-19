import { BadRequestError } from "./errors";
import { Schema } from "yup";

export const validatePayload = async (data: any, schema: Schema) => {
  try {
    return await schema.validate(data, {
      abortEarly: false,
    });
  } catch (error: any) {
    throw new BadRequestError(error.errors?.join(","));
  }
};
