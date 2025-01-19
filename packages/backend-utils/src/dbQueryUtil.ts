import { USER_CONSTANTS } from "@dscl-ttg/constants";
import { isEmpty } from "lodash";
import { Request } from "express";
export const generateQuery = (
  query: any[],
  filter?: any,
  sortBy?: any,
  skip?: number,
  limit?: number,
  customFacet?: any,
) => {
  if (filter && !isEmpty(filter)) {
    query.push({
      $match: filter,
    });
  }
  if (sortBy && !isEmpty(sortBy)) {
    query.push({
      $sort: sortBy,
    });
  }

  if (limit && limit > 0) {
    query.push(
      customFacet
        ? customFacet
        : {
            $facet: {
              count: [{ $count: "count" }],
              data: [{ $skip: skip }, { $limit: limit }],
            },
          },
    );
  } else if (skip && skip > 0) {
    query.push(
      customFacet
        ? customFacet
        : {
            $facet: {
              count: [{ $count: "count" }],
              data: [{ $skip: skip }],
            },
          },
    );
  } else {
    query.push(
      customFacet
        ? customFacet
        : {
            $facet: {
              count: [{ $count: "count" }],
              data: [],
            },
          },
    );
  }
};

export const prepareQueryParams = (
  query: any,
  params: string[],
  filter: any,
) => {
  for (let param of params) {
    if (query && query?.[`${param}`]) {
      if (String(query?.[`${param}`]) === "true") {
        filter[`${param}`] = true;
      } else if (String(query?.[`${param}`]) === "false") {
        filter[`${param}`] = false;
      } else {
        filter[`${param}`] = query?.[`${param}`];
      }
    }
  }
  return filter;
};

export const prepareDateQueryParams = (
  query: any,
  params: any,
  filter: any,
) => {
  for (let param of params) {
    if (query?.[param?.min] && query?.[param?.max]) {
      if (param.setHours) {
        query[param?.min] = new Date(query[param.min]).setHours(0, 0, 0, 0);
        query[param?.max] = new Date(query[param.max]).setHours(23, 59, 59, 0);
      }

      filter[param.key] = {
        $gte: new Date(query[param.min]),
        $lte: new Date(query[param.max]),
      };
    } else if (query?.[param?.min]) {
      if (param.setHours) {
        query[param?.min] = new Date(query[param.min]).setHours(0, 0);
      }

      filter[param.key] = { $gte: new Date(query[param.min]) };
    } else if (query?.[param?.max]) {
      if (param.setHours) {
        query[param?.max] = new Date(query[param.max]).setHours(23, 59);
      }

      filter[param.key] = { $lte: new Date(query[param.max]) };
    }
  }
  return filter;
};

export const getUserPermittedDetails = (user: any) => {
  let check_required = false;
  if (
    user &&
    user?.user_role_name !== USER_CONSTANTS.USER_ROLE.SUPER_ADMIN &&
    !user?.is_all_divisions_visible
  ) {
    check_required = true;
    const academicYearIds = new Set();
    const branchIds = new Set();
    const standardIds = new Set();
    const divisionIds = new Set();
    const dsbaIds = new Set();

    for (const division of user?.visible_divisions) {
      academicYearIds.add(division.academic_year_id);
      branchIds.add(division.branch_id);
      standardIds.add(division.standard_id);
      divisionIds.add(division.division_id);
      dsbaIds.add(division._id);
    }

    return {
      dsbaIds: Array.from(dsbaIds),
      check_required: check_required,
      academicYearIds: Array.from(academicYearIds),
      branchIds: Array.from(branchIds),
      divisionIds: Array.from(divisionIds),
      standardIds: Array.from(standardIds),
    };
  }
  return {
    check_required: check_required,
    dsbaIds: [],
    academicYearIds: [],
    branchIds: [],
    divisionIds: [],
    standardIds: [],
  };
};

export const getFilterSortBySkipLimit = (req: Request) => {
  const query: any = req?.query || {};
  const search = (query && query?.search) || "";
  const page = +query?.page || 0;
  const limit = +query?.pageSize || 0;
  const skip = page * limit;
  const sort = query?.sort?.split(",");
  let sortBy: any = {};
  if (sort?.length) {
    for (const key of sort) {
      sortBy[key] = 1;
    }
  }
  const filter = {
    basicFilter: {},
    advanceFilter: {},
    manualFilter: {},
  };
  return { query, search, page, limit, skip, sortBy, filter };
};
