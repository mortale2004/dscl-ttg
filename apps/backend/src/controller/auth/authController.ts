import {
  generateAccessToken,
  generateRefreshToken,
  getTokenPayload,
  getUser,
  getUserId,
  InternalServerError,
  requestHandlingWrapper,
  responseUtil,
  UnauthenticatedError,
  validatePayload,
  verifyRefreshToken,
} from "@dscl-ttg/backend-utils";
import { Request, Response } from "express";
import userLoginDas from "src/das/user/userLoginDas";
import {
  jobSeekerRegistrationSchema,
  userLoginPayloadSchema,
} from "@dscl-ttg/types/user";
import { USER_CONSTANTS } from "@dscl-ttg/constants";
import userRegistrationDas from "src/das/user/userRegistrationDas";

import env from "@dscl-ttg/env";
import authenticationService from "@services/authenticationService";
import userRolePermissionDas from "src/das/system/userRolePermissionDas";

export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "Strict",
  maxAge: 900000,
};

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "Strict",
  maxAge: 2592000000,
};

export const handleLogout = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (
    !(await userLoginDas.updateRecord(
      { user_id: userId },
      { access_token: "", refresh_token: "" }
    ))
  ) {
    throw new InternalServerError("Error while Logout!");
  }
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
};
export const getUserData = async (filter: any) => {
  // TODO
  const [response] = await userRegistrationDas.aggregate(filter);
  if (!response?.data?.[0]) {
    return null;
  }

  const user = response.data[0];
  user.layout_type_name = user?.userRoleDetails?.[0]?.layout_type_name;
  user.user_role_name = user?.userRoleDetails?.[0]?.user_role_name;
  if (user.user_role_name !== USER_CONSTANTS.USER_ROLE.SUPER_ADMIN) {
    const [permissions] = await userRolePermissionDas.aggregate({
      basicFilter: {
        user_role_id: user?.user_role_ids?.[0],
      },
    });

    if (!permissions?.data?.length) {
      throw new InternalServerError("Error while Login!");
    }

    const permissionsObj: any = {};

    for (const permission of permissions?.data) {
      if (permission.ui_route) {
        permissionsObj[permission.ui_route] = permission.permissions;
      }
      if (permission.api_route) {
        permissionsObj[permission.api_route] = permission.permissions;
      }
    }

    user.permissions = permissionsObj;
  }

  return user;
};


export const authController = {
  register: requestHandlingWrapper(async (req: Request, res: Response) => {
   
  }),

  userData: requestHandlingWrapper(async (req: Request, res: Response) => {
    const data = getUser(req);
    responseUtil.givenResponse(
      {
        data: data,
        status: true,
      },
      res
    );
  }),

  login: requestHandlingWrapper(async (req: Request, res: Response) => {
    const payload = await validatePayload(
      req.body.formData,
      userLoginPayloadSchema
    );

    const user = await getUserData({
      basicFilter: {
        username: payload.username,
        password: payload.password,
      },
    });


    // TODO Add Bcrypt Compare for hashed passwords
    if (!user) {
      throw new UnauthenticatedError("Username/Password is Incorrect!");
    }

    const accessToken = generateAccessToken(getTokenPayload(user));
    const refreshToken = generateRefreshToken(getTokenPayload(user));
    if (
      !(await userLoginDas.updateRecord(
        { user_id: user._id },
        {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        {
          upsert: true,
          new: true,
        }
      ))
    ) {
      throw new InternalServerError("Error while Login!");
    }

    res.cookie("access_token", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS as any);

    res.cookie(
      "refresh_token",
      refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS as any
    );

    responseUtil.givenResponse(
      {
        data: user,
        status: true,
        message: "Login successful!",
      },
      res
    );
  }),

  refreshToken: requestHandlingWrapper(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw new UnauthenticatedError("EMPTY!");
    }

    const tokenData: any =
      await authenticationService.authenticateWithRefreshToken(
        req,
        res,
        refreshToken
      );

    const user = await getUserData({ basicFilter: { _id: tokenData._id } });

    if (!user) {
      throw new InternalServerError("Error while Login!");
    }

    const accessToken = generateAccessToken(getTokenPayload(user));

    if (
      !(await userLoginDas.updateRecord(
        { user_id: (tokenData as any)?._id },
        {
          access_token: accessToken,
        }
      ))
    ) {
      throw new InternalServerError("Error while Login!");
    }

    res.cookie("access_token", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS as any);

    responseUtil.givenResponse(
      {
        data: user,
        status: true,
      },
      res
    );
  }),

  logout: requestHandlingWrapper(async (req: Request, res: Response) => {
    await handleLogout(req, res);

    responseUtil.givenResponse(
      {
        status: true,
        message: "Logged out successfully",
      },
      res
    );
  }),
};
