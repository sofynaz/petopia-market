import httpStatus from 'http-status';
import { BadRequestError } from '@repo/core';
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const validation: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const error = new BadRequestError({
      message: (err as ZodError).flatten().fieldErrors,
      statusCode: httpStatus.BAD_REQUEST,
      error: 'validation_error',
    });

    return res.status(error.getStatus()).json(error.getBody());
  }

  next(err);
};
