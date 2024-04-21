// Import necessary types from Express
import type { Request, Response, NextFunction } from 'express';

// Define the type for request handler functions
export type ReqHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => any;

// Define the type for request context handler functions
export type ReqCtxHandler<T> = (
  context: T,
  req: Request,
  res: Response,
  next: NextFunction,
) => any;

// Define the type for constructors
export type Constructor<T> = new (...args: any[]) => T;

// Define the type for context objects created from constructors
export type Context<T extends Constructor<any>[]> = {
  [K in keyof T]: InstanceType<T[K]>;
};
