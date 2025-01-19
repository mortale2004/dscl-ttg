import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

export const generateModel = (
  collection: string,
  schemaObj: any,
  schema?: any,
  hasAddedMetaData?: boolean,
  hasModifiedMetaData?: boolean,
  hasIsActiveMetaData?: boolean,
) => {
  if (!schemaObj._id) {
    schemaObj._id = {
      type: String,
      default: uuid,
    };
  }

  if (hasAddedMetaData) {
    schemaObj.added_on = {
      type: Date,
      required: true,
    };
    schemaObj.added_by = {
      type: String,
      required: true,
    };
  }

  if (hasModifiedMetaData) {
    schemaObj.modified_on = {
      type: Date,
    };
    schemaObj.modified_by = {
      type: String,
    };
  }

  if (hasIsActiveMetaData) {
    schemaObj.is_active = {
      type: Boolean,
      required: true,
    };
  }

  return mongoose.model(
    collection,
    new mongoose.Schema(schemaObj, {
      collection,
    }),
  );
};
