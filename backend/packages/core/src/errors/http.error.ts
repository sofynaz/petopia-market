import { isString, isObject } from 'lodash';
import type { BodyMessage, HttpErrorBody } from '../interfaces/error.interface';

/**
 * Custom HTTP Error Class
 * Handles API HTTP errors
 */
export class HttpError extends Error {
  constructor(
    private readonly res: string | Record<string, any> | BodyMessage,
    private readonly status: number,
    private readonly error?: string,
  ) {
    super();
    // Initialize error message and name
    this.initMessage();
    this.initName();
    // Capture stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }

  // Initialize the error message based on the response
  private initMessage() {
    if (typeof this.res === 'string') {
      // If response is a string, use it as the message
      this.message = this.res;
    } else if (
      isObject(this.res) &&
      !Array.isArray(this.res) &&
      isString(this.res.message)
    ) {
      // If response is an object with a message property, use it as the message
      this.message = this.res.message;
    } else {
      // If no message provided, set a default error message based on the class name
      this.message =
        this.constructor.name.replace(/[A-Z][a-z]+|[0-9]+/g, ' ') || 'Error';
    }
  }

  // Initialize the error name based on the class name
  private initName() {
    this.name = this.constructor.name;
  }

  // Get the original response
  public getResponse() {
    return this.res;
  }

  // Get the HTTP status code
  public getStatus() {
    return this.status;
  }

  // Get the description of the error
  public getError() {
    return this.error;
  }

  // Get the error body
  public getBody(): HttpErrorBody | Record<string, any> {
    if (!this.res)
      return {
        message: this.error,
        statusCode: this.status,
      };

    if (isString(this.res) || Array.isArray(this.res)) {
      // If response is a string or an array, construct the error body
      return {
        message: this.res,
        error: this.error,
        statusCode: this.status,
      };
    }
    // If response is an object, return it as the error body
    return this.res;
  }

  // Check if an error is an instance of HttpError
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }
}
