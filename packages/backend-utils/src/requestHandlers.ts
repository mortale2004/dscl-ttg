import type { NextFunction, Request, Response } from "express";
import { validatePayload } from "./validationUtil";
import { responseUtil } from "./responseUtil";
import { getIndianDateTime } from "@dscl-ttg/date-time";
import { BadRequestError, InternalServerError } from "./errors";
import { getFilterSortBySkipLimit, prepareQueryParams } from "./dbQueryUtil";
import { isEmpty } from "lodash";

export const requestHandlingWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const generatePostHandler = ({
  name,
  createSchema,
  isExists = () => true,
  insert,
  getData,
  addMetaData,
}: {
  name: string;
  createSchema: any;
  isExists: Function;
  insert: Function;
  getData: Function;
  addMetaData?: boolean;
}) => {
  return requestHandlingWrapper(async (req: Request, res: Response) => {
    if (addMetaData) {
      req.body.formData.added_by = (req as any)?.context?.user._id;
      req.body.formData.added_on = getIndianDateTime();
    }
    const payload = await validatePayload(req.body.formData, createSchema);

    if (await isExists(payload)) {
      throw new BadRequestError(
        `${name} is already exists with given details!`,
      );
    }
    const [insertResponse] = await insert?.(payload);
    if (!insertResponse) {
      throw new InternalServerError(`Failed to create ${name}!`);
    }

    const response = await getData({
      basicFilter: { _id: insertResponse._id },
    });
    responseUtil.create(response, res, `${name} created successfully!`);
  });
};

export const generateGetHandler = ({
  name,
  getData,
}: {
  name: string;
  getData: Function;
}) => {
  return requestHandlingWrapper(async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!_id) {
      throw new BadRequestError(`Error while getting ${name} details!`);
    }
    const response = await getData({ basicFilter: { _id: _id } });
    responseUtil.get(response, res, `${name} fetched successfully!`);
  });
};

export const generatePutHandler = ({
  name,
  updateSchema,
  isExists,
  update,
  getData,
  addMetaData,
}: {
  name: string;
  updateSchema: any;
  update: Function;
  getData: Function;
  isExists: Function;
  addMetaData?: boolean;
}) => {
  return requestHandlingWrapper(async (req: Request, res: Response) => {
    const payload = await validatePayload(req.body.formData, updateSchema);
    if (await isExists(payload)) {
      throw new BadRequestError(
        `${name} is already exists with given details!`,
      );
    }
    if (addMetaData) {
      payload.modified_by = (req as any)?.context?.user._id;
      payload.modified_on = getIndianDateTime();
    }
    if (!(await update({ _id: payload._id }, payload))) {
      throw new InternalServerError(`Error while updating ${name} details!`);
    }

    const response = await getData({ basicFilter: { _id: payload._id } });
    responseUtil.update(response, res, `${name} updated successfully!`);
  });
};

export const generateDeleteHandler = ({
  name,
  deleteRecord,
}: {
  name: string;
  deleteRecord: Function;
}) => {
  return requestHandlingWrapper(async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!_id || !(await deleteRecord({ _id: _id }, {}, true))) {
      throw new InternalServerError(`Error while deleting ${name} details!`);
    }

    responseUtil.givenResponse(
      {
        data: _id,
        message: `${name} deleted successfully!`,
        status: true,
      },
      res,
    );
  });
};

export const generateGetAllHandler = ({
  name,
  getData,
  searchableFields,
  getListParams,
}: {
  name: string;
  getData: Function;
  searchableFields: string[];
  getListParams?: any;
}) => {
  return requestHandlingWrapper(async (req: Request, res: Response) => {
    let { filter, query, skip, page, limit, sortBy }: any =
      getFilterSortBySkipLimit(req);

    if (!isEmpty(getListParams)) {
      prepareQueryParams(
        query,
        getListParams.basicFilter || [],
        filter.basicFilter,
      );
      prepareQueryParams(
        query,
        getListParams.advanceFilter || [],
        filter.advanceFilter,
      );
      prepareQueryParams(
        query,
        getListParams.manualFilter || [],
        filter.manualFilter,
      );
    }

    await getListParams?.handleFilters?.(
      (req as any)?.context?.user,
      query,
      filter,
    );

    if (searchableFields.length > 0 && req?.query?.search) {
      filter.advanceFilter.$or = searchableFields.map((field) => ({
        [field]: { $regex: req?.query?.search },
      }));
    }

    const response = await getData(filter, getListParams.sortBy, skip, limit);
    response.page = page;
    responseUtil.getList(response, res);
  });
};
