import { userRolePermissionModel as model } from "@dscl-ttg/models/system";
import type { QueryOptions } from "mongoose";
import { collectionReference, collections } from "@dscl-ttg/models/constants";
import DBOperations from "src/das";
import { buildHierarchy } from "@dscl-ttg/utils";

const createModuleHierarchy = (data: any[]) => {
  // Create a map to store modules by their module_id
  const moduleMap = new Map();

  // Create a map to store children for each parent_id
  const childrenMap = new Map();

  // Track all parent IDs and module IDs to find root nodes
  const parentIds = new Set();
  const moduleIds = new Set();

  // First pass: Group modules and collect IDs
  data.forEach((item) => {
    parentIds.add(item.parent_id);
    moduleIds.add(item.module_id);

    // If this module_id hasn't been processed yet
    if (!moduleMap.has(item.module_id)) {
      moduleMap.set(item.module_id, {
        _id: item._id,
        module_id: item.module_id,
        module_name: item.module_name,
        route_id: item.route_id,
        description: item.description,
        routes: [],
        children: [],
      });
    }

    // Add route information to the module
    moduleMap.get(item.module_id).routes.push({
      _id: item._id,
      route_id: item.route_id,
      route_name: item.route_name,
      ui_route: item.ui_route,
      api_route: item.api_route,
      permissions: item.permissions,
      description: item.description,
    });

    // Initialize children array for this parent if it doesn't exist
    if (!childrenMap.has(item.parent_id)) {
      childrenMap.set(item.parent_id, new Set());
    }

    // Add this module as a child of its parent
    childrenMap.get(item.parent_id).add(item.module_id);
  });

  // Build the hierarchy for a given parent
  const buildHierarchy = (parentId: string | undefined): any => {
    const children = childrenMap.get(parentId);
    if (!children) return [];

    return Array.from(children)
      .map((childId) => {
        const module = moduleMap.get(childId);
        if (!module) return null;

        return {
          ...module,
          children: buildHierarchy(childId as any),
        };
      })
      .filter(Boolean);
  };

  // Get all unique parent IDs that don't exist as module IDs (these are root level parents)
  const rootParentIds = Array.from(parentIds).filter(
    (parentId) => !moduleIds.has(parentId)
  );

  // Build hierarchy starting from each root parent
  const result : any[] = [];
  rootParentIds.forEach((parentId) => {
    const hierarchy = buildHierarchy(parentId as any);
    result.push(...hierarchy);
  });

  return result;
};

class userRolePermissionDas extends DBOperations {
  constructor(model: any) {
    super(model, collectionReference.system.masUserRolePermission);
  }
  isExists(payload: any) {
    const filter: any = {
      route_id: payload.route_id,
      user_role_id: payload.user_role_id,
    };
    if (payload._id) {
      filter._id = { $ne: payload._id };
    }
    return super.isExists(filter);
  }
  async aggregate(
    filter?: any,
    sortBy?: any,
    skip?: number,
    limit?: number,
    options?: QueryOptions
  ) {
    sortBy = {
      module_name: 1,
    };
    const response = await super.aggregate(
      [
        {
          $lookup: {
            from: collections.system.masRoute,
            let: { routeId: "$route_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$routeId"],
                  },
                },
              },
              {
                $lookup: {
                  from: "mas_module",
                  let: { moduleId: "$module_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$moduleId"],
                        },
                      },
                    },
                  ],
                  as: "moduleDetails",
                },
              },
            ],
            as: "routeDetails",
          },
        },
        {
          $project: {
            _id: 1,
            user_role_id: 1,
            route_id: 1,
            module_id: { $first: "$routeDetails.module_id" },
            module_name: {
              $first: { $first: "$routeDetails.moduleDetails.module_name" },
            },
            parent_id: {
              $first: { $first: "$routeDetails.moduleDetails.parent_id" },
            },
            ui_route: { $first: "$routeDetails.ui_route" },
            api_route: { $first: "$routeDetails.api_route" },
            description: { $first: "$routeDetails.description" },
            route_name: { $first: "$routeDetails.route_name" },
            permissions: "$permissions",
          },
        },
      ],
      options,
      {
        filter,
        limit,
        sortBy,
        skip,
      }
    );
    if (filter?.manualFilter?.build_hierarchy){
        response[0].data = createModuleHierarchy(response[0].data);
    }
    return response;
  }
}

export default new userRolePermissionDas(model);
