import httpStatus from 'http-status';
import { HttpError } from './http.error';
import type { BodyMessage } from '../interfaces/error.interface';

/**
 * BadRequestError: Represents a Bad Request HTTP error (400)
 * This error is typically thrown when the server cannot process the request due to invalid syntax.
 */
export class BadRequestError extends HttpError {
  constructor(
    message?: BodyMessage | object | any,
    description: string = 'Bad Request',
  ) {
    super(message, httpStatus.BAD_REQUEST, description);
  }
}

/**
 * ConflictError: Represents a Conflict HTTP error (409)
 * This error is typically thrown when the request conflicts with the current state of the server.
 */
export class ConflictError extends HttpError {
  constructor(
    message?: BodyMessage | object | any,
    description: string = 'Conflict',
  ) {
    super(message, httpStatus.CONFLICT, description);
  }
}

/**
 * ForbiddenError: Represents a Forbidden HTTP error (403)
 * This error is typically thrown when the server refuses to fulfill the request.
 */
export class ForbiddenError extends HttpError {
  constructor(
    message?: BodyMessage | object | any,
    description: string = 'Forbidden',
  ) {
    super(message, httpStatus.FORBIDDEN, description);
  }
}

/**
 * InternalServerError: Represents an Internal Server Error HTTP error (500)
 * This error is typically thrown when the server encounters an unexpected condition that prevents it from fulfilling the request.
 */
export class InternalServerError extends HttpError {
  constructor(
    message?: BodyMessage | object | any,
    description: string = 'Internal Server Error',
  ) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR, description);
  }
}

/**
 * NotFoundError: Represents a Not Found HTTP error (404)
 * This error is typically thrown when the server cannot find the requested resource.
 */
export class NotFoundError extends HttpError {
  constructor(
    message?: BodyMessage | object | any,
    description: string = 'Not Found',
  ) {
    super(message, httpStatus.NOT_FOUND, description);
  }
}

/**
 * UnauthorizedError: Represents an Unauthorized HTTP error (401)
 * This error is typically thrown when the request lacks valid authentication credentials.
 */
export class UnauthorizedError extends HttpError {
  constructor(
    message?: BodyMessage | object | any,
    description: string = 'Unauthorized',
  ) {
    super(message, httpStatus.UNAUTHORIZED, description);
  }
}
