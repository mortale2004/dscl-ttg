import { routeMethods } from "@dscl-ttg/constants";
import { NotFoundError } from "./errors";
import {
  generateDeleteHandler,
  generateGetAllHandler,
  generateGetHandler,
  generatePostHandler,
  generatePutHandler,
} from "./requestHandlers";

export const getData = async (
  name: string,
  single: boolean,
  aggregate: Function,
  filters?: any,
  sortBy?: any,
  skip?: number,
  limit?: number,
  options?: any,
) => {
  const [response] = await aggregate(filters, sortBy, skip, limit, options);
  if (single) {
    if (!response?.data?.[0]) {
      throw new NotFoundError(`${name} not found!`);
    }
    return response?.data?.[0];
  }
  response.count = response?.count?.[0]?.count || 0;
  return response;
};

export const generateController = ({
  das,
  name = "",
  createHandler = generatePostHandler,
  getHandler = generateGetHandler,
  updateHandler = generatePutHandler,
  deleteHandler = generateDeleteHandler,
  getAllHandler = generateGetAllHandler,
  createSchema,
  updateSchema,
  addMetaData = false,
  searchableFields = [],
  getListParams,
}: {
  das: any;
  name?: string;
  createHandler?: Function;
  getHandler?: Function;
  updateHandler?: Function;
  deleteHandler?: Function;
  getAllHandler?: Function;
  createSchema?: any;
  updateSchema?: any;
  addMetaData?: boolean;
  searchableFields: string[];
  getListParams?: any;
}) => {
  return {
    [routeMethods.Create]: createHandler({
      name,
      createSchema,
      isExists: das.isExists,
      insert: das.insertOne,
      getData: (filters: any) => getData(name, true, das.aggregate, filters),
      addMetaData,
    }),

    [routeMethods.Get]: getHandler({
      name,
      getData: (filters: any) => getData(name, true, das.aggregate, filters),
    }),

    [routeMethods.Update]: updateHandler({
      name,
      updateSchema,
      update: das.updateRecord,
      isExists: das.isExists,
      getData: (filters: any) => getData(name, true, das.aggregate, filters),
      addMetaData,
    }),
    [routeMethods.GetList]: getAllHandler({
      name,
      searchableFields,
      getData: (filters: any, sort: any, skip: any, limit: any) =>
        getData(name, false, das.aggregate, filters, sort, skip, limit),
      getListParams,
    }),
    [routeMethods.Delete]: deleteHandler({
      name,
      deleteRecord: das.deleteRecord,
    }),
  };
};
