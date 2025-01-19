import type { NextFunction, Request, Response } from "express";
import {
  publicUrls,
  limitedAccessUrlsForGetReq,
  limitedAccessUrlsForPostReq,
  USER_ROLE,
} from "@dscl-ttg/constants";
import { isEmpty } from "lodash";
import authenticationService from "src/services/authenticationService";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  getUserData,
} from "src/controller/auth/authController";
import {
  requestHandlingWrapper,
  UnauthenticatedError,
} from "@dscl-ttg/backend-utils";
import url from "url";
import { SYSTEM_CONSTANT } from "@dscl-ttg/constants";
const { PERMISSION } = SYSTEM_CONSTANT;
/**
 * * Purpose: Middleware that authenticates user's request based on JWT token.
 * * Step 1: Get the authorization header from request
 * * Step 2: Extract the authToken from authorization header
 * * Step 3: Verify the authentication token
 * * Step 4: If verification fails, show the error
 * * Step 5: If token verification successful, get the user details
 */
const handleAuthentication = requestHandlingWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      publicUrls.includes(req.url) ||
      publicUrls.some((url: string) => req.url.startsWith(url))
    ) {
      next();
      return;
    } else if (
      (limitedAccessUrlsForGetReq.includes(req.url) ||
        limitedAccessUrlsForGetReq.some((url: string) =>
          req.url.startsWith(url)
        )) &&
      req.method == "GET" &&
      isEmpty(req.params)
    ) {
      next();
      return;
    } else if (
      limitedAccessUrlsForPostReq.includes(req.url) &&
      req.method == "POST" &&
      isEmpty(req.params)
    ) {
      next();
      return;
    }
    const accessToken = req.cookies?.access_token;
    let userData = await authenticationService.authenticateWithAccessToken(
      req,
      res,
      accessToken
    );

    const user = await getUserData({ basicFilter: { _id: userData._id } });
    (req as any).context = {
      user: user,
    };

    const { method } = req;
    const requestedRoute = url.parse(req.originalUrl).pathname || "";

    // If the user is a SUPER_ADMIN, allow all actions
    if (user?.user_role_name === USER_ROLE.SUPER_ADMIN) {
      return next();
    }

    // Check if the route is explicitly mapped to a permission
    const routePermission = user?.permissions?.[requestedRoute];

    if (!routePermission) {
      return next(
        new UnauthenticatedError(
          "You don't have enough permission to access this resource. Contact administrator."
        )
      );
    }

    // Map method to permission
    let permissionKey: string | undefined;

    switch (method) {
      case "GET":
        permissionKey =
          routePermission === PERMISSION.GET_LIST
            ? PERMISSION.GET_LIST
            : PERMISSION.GET;
        break;
      case "POST":
        permissionKey = PERMISSION.CREATE;
        break;
      case "PUT":
        permissionKey = PERMISSION.UPDATE;
        break;
      case "DELETE":
        permissionKey = PERMISSION.DELETE;
        break;
      default:
        permissionKey = undefined;
    }

    // Check if the user has the required permission for the requested route
    if (
      permissionKey &&
      user?.permissions?.[requestedRoute]?.includes(permissionKey)
    ) {
      return next();
    }

    // If the user doesn't have the necessary permission
    return next(
      new UnauthenticatedError(
        "You don't have enough permission to access this resource. Contact administrator."
      )
    );
  }
);

export default handleAuthentication;
