import jwt from "jsonwebtoken";
import { UnauthenticatedError, UnauthorizedError } from "./errors";
import env from "@dscl-ttg/env";

type JwtPayloadType = {
  _id: string;
  user_role_name: string;
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, env.AUTH.JWT_REFRESH_SECRET) as JwtPayloadType;
  } catch (error: any) {
    if (error.name == "TokenExpiredError") {
      throw new UnauthorizedError("Authentication token has been expired!");
    } else {
      throw new UnauthenticatedError("Unauthenticated!");
    }
  }
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, env.AUTH.JWT_ACCESS_SECRET) as JwtPayloadType;
  } catch (error: any) {
    if (error.name == "TokenExpiredError") {
      throw new UnauthorizedError("Authentication token has been expired!");
    } else {
      throw new UnauthenticatedError("Unauthenticated!");
    }
  }
};

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, env.AUTH.JWT_ACCESS_SECRET, {
    expiresIn: env.AUTH.JWT_ACCESS_EXPIRATION,
  });
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, env.AUTH.JWT_REFRESH_SECRET, {
    expiresIn: env.AUTH.JWT_REFRESH_EXPIRATION,
  });
};

export const getTokenPayload = (data: any) => {
  return {
    _id: data._id,
    user_role_name: data.user_role_name,
  } as JwtPayloadType;
};
