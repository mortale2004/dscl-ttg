import type { Model, QueryOptions, ClientSession } from "mongoose";
import { isEmpty } from "lodash";
import {
  BadRequestError,
  generateQuery,
  isReferenceExists,
  prepareQuery,
} from "@dscl-ttg/backend-utils";
import type { CollectionReferenceType } from "@dscl-ttg/models/constants";

class DBOperations {
  model: Model<any> | null;
  reference_models: CollectionReferenceType[] = [];

  constructor(model: Model<any>, reference_models?: CollectionReferenceType[]) {
    this.model = model;
    if (reference_models) {
      this.reference_models = reference_models;
    }
    this.aggregate = this.aggregate.bind(this);
    this.insertOne = this.insertOne.bind(this);
    this.getRecords = this.getRecords.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.updateRecords = this.updateRecords.bind(this);
    this.updateSingleRecord = this.updateSingleRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.deleteRecords = this.deleteRecords.bind(this);
    this.bulkWrite = this.bulkWrite.bind(this);
    this.getCount = this.getCount.bind(this);
    this.isExists = this.isExists.bind(this);
  }

  insertOne(payload: any, options: QueryOptions) {
    return this.model?.create([payload], options) || [];
  }

  async isExists(filter: any) {
    return this.model?.findOne(filter).lean();
  }
  getRecords(
    filter: any,
    projection?: any,
    sortBy?: any,
    skip = 0,
    limit = 0,
    session?: ClientSession
  ) {
    let query = this.model?.find(filter, projection).sort(sortBy).skip(skip);
    if (limit !== 0) {
      query = query?.limit(limit);
    }

    if (session) {
      query = query?.session(session);
    }
    return query?.lean() || [];
  }

  getRecord(
    filter: any,
    projection?: string,
    sortBy?: any,
    session?: ClientSession
  ) {
    let record;
    if (session) {
      record = this.model
        ?.findOne(filter, projection)
        .sort(sortBy)
        .session(session)
        .lean();
    } else {
      record = this.model?.findOne(filter, projection).sort(sortBy).lean();
    }
    return record;
  }
  async aggregate(query: any, options?: QueryOptions, customParams?: any) {
    if (!isEmpty(customParams)) {
      if (!isEmpty(customParams?.filter?.basicFilter)) {
        query.unshift({ $match: customParams?.filter?.basicFilter });
      }
      generateQuery(
        query,
        customParams?.filter?.advanceFilter,
        customParams.sortBy,
        customParams.skip,
        customParams.limit,
        customParams.facet
      );
    }
    let response;
    if (options?.session) {
      response = this.model?.aggregate(query).session(options.session).exec();
    } else {
      response = this.model?.aggregate(query).exec();
    }
    return response || [];
  }

  bulkWrite(operations: any[], options: any): any {
    return this.model?.bulkWrite(operations, options);
  }

  getCount(filter: any) {
    return this.model?.countDocuments(filter);
  }
  updateRecords(filter?: any, payload?: any, options?: any) {
    return this.model?.updateMany(filter, payload, options);
  }
  updateRecord(filter?: any, payload?: any, options?: QueryOptions) {
    return this.model?.findOneAndUpdate(filter, payload, options).lean();
  }

  updateSingleRecord(filter: any, payload: any, options: any) {
    return this.model?.updateOne(filter, payload, options).lean();
  }

  deleteRecords(filter: any, options: any, checkReference = true): any {
    return this.model?.deleteMany(filter, options);
  }

  async deleteRecord(
    filter: any,
    options: QueryOptions,
    checkReference = true
  ) {
    if (checkReference) {
      if (filter._id) {
        const query = prepareQuery(filter._id, this.reference_models);
        const response = await this.model?.aggregate(query);
        if (!response?.length) {
          throw new BadRequestError("No data found!");
        }
        if (await isReferenceExists(response[0], this.reference_models)) {
          throw new BadRequestError(
            "This record is in mapped with another record!"
          );
        }
      } else {
        throw new BadRequestError("Please provide id!");
      }
    }
    return this.model?.findOneAndDelete(filter, options).lean();
  }
}
export default DBOperations;
