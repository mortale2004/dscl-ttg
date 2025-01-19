import { HttpStatusCodes } from "@dscl-ttg/constants";
/**
 * Unauthorized error.
 */
export class UnauthorizedError extends Error {
  status: number;
  constructor(message: string) {
    super();
    this.status = HttpStatusCodes.Forbidden;
    this.name = this.constructor.name;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Unauthenticated error.
 */
export class UnauthenticatedError extends Error {
  status: number;
  constructor(message: string) {
    super();
    this.status = HttpStatusCodes.Unauthorized;
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Conflict error.
 */
export class ConflictError extends Error {
  status: number;
  conflicts: any;
  constructor(conflicts: any, message: string) {
    super();
    this.status = HttpStatusCodes.Conflict;
    this.name = this.constructor.name;
    this.message = message;
    this.conflicts = conflicts;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Internal system error.
 */
export class InternalServerError extends Error {
  status: number;
  error: any;
  constructor(message: string, error?: any) {
    super();
    this.status = HttpStatusCodes.InternalServerError;
    this.name = this.constructor.name;
    this.message = message;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Bad request error.
 */
export class BadRequestError extends Error {
  status: number;
  constructor(message: string) {
    super();
    this.status = HttpStatusCodes.BadRequest;
    this.name = this.constructor.name;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error.
 */
export class ValidationError extends Error {
  status: number;
  errors: any[];
  constructor(message: string, error: any) {
    super();
    this.status = HttpStatusCodes.UnprocessableEntity;
    this.name = this.constructor.name;
    this.message = message;
    this.errors =
      error?.details && Array.isArray(error?.details)
        ? error?.details.map((d: any) => d.message)
        : [];

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Rate limit exceeded error.
 */
export class RateLimitExceededError extends Error {
  status: number;
  constructor(message: string) {
    super();
    this.status = HttpStatusCodes.TooManyRequests;
    this.name = this.constructor.name;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error.
 */
export class NotFoundError extends Error {
  status: number;
  constructor(message: string) {
    super();
    this.status = HttpStatusCodes.NotFound;
    this.name = this.constructor.name;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Internal OAuth error.
 */
export class InternalOAuthError extends Error {
  status: number;
  data: any;
  constructor(status = 500, message: string, data: any) {
    super();
    this.status = status;
    this.name = this.constructor.name;
    this.message = message;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}
