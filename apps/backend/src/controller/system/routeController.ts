import {
  BadRequestError,
  responseUtil,
  validatePayload,
  InternalServerError,
  requestHandlingWrapper,
  generateController,
} from "@dscl-ttg/backend-utils";
import { routeSchema } from "@dscl-ttg/types/system";
import mongoose from "mongoose";
import { apiEndPoints, USER_CONSTANTS } from "@dscl-ttg/constants";
import { getIndianDateTime } from "@dscl-ttg/date-time";
import type { Request, Response, NextFunction } from "express";
import userRolePermissionDas from "src/das/system/userRolePermissionDas";
import userRoleDas from "src/das/system/userRoleDas";
import routeDas from "src/das/system/routeDas";

export const routeController = generateController({
  name: "Route",
  das: routeDas,
  createSchema: routeSchema.omit(["_id", "modified_by", "modified_on"]),
  updateSchema: routeSchema.omit(["added_by", "added_on"]),
  addMetaData: true,
  searchableFields: ["route_name"],
  getListParams: {
    basicFilter: ["is_active", "module_id"],
    sortBy: {
      module_name: 1,
      route_name: 1,
    },
  },
  createHandler: () =>
    requestHandlingWrapper(
      async (req: Request, res: Response, _: NextFunction) => {
        const payload = await validatePayload(
          req.body.formData,
          routeSchema.omit([
            "_id",
            "modified_by",
            "modified_on",
            "added_by",
            "added_on",
          ])
        );
        let session;
        try {
          if (await routeDas.isExists(payload)) {
            throw new BadRequestError("Route already exists!");
          }

          payload.added_by = (req as any)?.context?.user?._id;
          payload.added_on = getIndianDateTime();

          session = await mongoose.startSession();
          await session.withTransaction(async (session) => {
            const [routeDetails] = await routeDas.insertOne(payload, {
              session,
            });

            if (!routeDetails) {
              throw new InternalServerError(
                `Error while adding the route details!`
              );
            }

            const userRoles = await userRoleDas.getRecords({
              user_role_name: { $ne: USER_CONSTANTS.USER_ROLE.SUPER_ADMIN },
              is_active: true,
            });

            const permissionsPayload = [];

            for (const userRole of userRoles) {
              permissionsPayload.push({
                insertOne: {
                  document: {
                    added_on: getIndianDateTime(),
                    added_by: (req as any)?.context?.user?._id,
                    permissions: [],
                    route_id: routeDetails._id,
                    user_role_id: userRole._id,
                  },
                },
              });
            }

            const permissionsCreateResponse =
              await userRolePermissionDas.bulkWrite(permissionsPayload, {
                session,
              });

            if (
              permissionsCreateResponse?.insertedCount !==
              permissionsPayload.length
            ) {
              throw new Error("Error while creating route details");
            }

            const [response] = await routeDas.aggregate(
              { basicFilter: { _id: routeDetails._id } },
              undefined,
              undefined,
              undefined,
              { session }
            );
            await session.commitTransaction();
            responseUtil.createWithGet(response, res);
          });
        } catch (error: any) {
          throw error;
        } finally {
          await session?.endSession();
        }
      }
    ),
});
