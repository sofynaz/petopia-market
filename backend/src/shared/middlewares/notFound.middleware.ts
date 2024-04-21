import { Router } from 'express';
import { NotFoundError, wrapper } from '@repo/core';

export const notFound: Router = Router();

// not found request handler
notFound.all(
  '*',
  wrapper((req) => {
    throw new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`);
  }),
);
