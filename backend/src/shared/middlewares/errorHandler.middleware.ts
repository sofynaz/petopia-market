import logger from '@repo/logger';
import httpStatus from 'http-status';
import { HttpError, InternalServerError } from '@repo/core';
import type { Request, Response, NextFunction } from 'express';

// middleware handle errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // http errors
  if (HttpError.isHttpError(err))
    return res.status(err.getStatus()).json(err.getBody());

  // console on error
  logger.error(err);

  // unknown errors
  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send(new InternalServerError(err.message).getBody());
};
