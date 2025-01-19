import {
  BadRequestError,
  ConflictError,
  InternalOAuthError,
  InternalServerError,
  RateLimitExceededError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "@dscl-ttg/backend-utils";
import { isJsonString } from "@dscl-ttg/utils";
import type { NextFunction, Request, Response } from "express";
import logger from "@dscl-ttg/logger";
/**
 * Not found error handling middleware.
 * @param {object} req Express request instance.
 * @param {object} res Express response instance.
 */
export const handleNotFoundError = (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Route not found.",
    ...(req.method ? { request: req.method } : {}),
    ...(req.path ? { path: req.path } : {}),
  });
};

/**
 * Error handling middleware.
 * @param {Error} error Thrown error.
 * @param {object} req Express request instance.
 * @param {object} res Express response instance.
 * @param {function} next Express next function.
 */
export const handleErrors = (
  error:
    | Error
    | UnauthorizedError
    | UnauthenticatedError
    | BadRequestError
    | RateLimitExceededError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`In Global Logger Error: ${error} ${error.stack}`);
  if (
    error instanceof UnauthorizedError ||
    error instanceof UnauthenticatedError ||
    error instanceof BadRequestError ||
    error instanceof RateLimitExceededError
  ) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
    });
  } else if (error instanceof InternalServerError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
    });
  } else if (error instanceof ConflictError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      conflicts: error.conflicts,
    });
  } else if (error instanceof ValidationError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      ...(error.errors.length ? { errors: error.errors } : {}),
    });
  } else if (error instanceof InternalOAuthError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      ...(error.data
        ? isJsonString(error.data)
          ? { data: JSON.parse(error.data) }
          : { data: error.data }
        : {}),
    });
  } else {
    res.status((error as any).status || 500).json({
      status: (error as any).status || 500,
      message: error.message || "Internal server error.",
    });
  }
  next();
};
