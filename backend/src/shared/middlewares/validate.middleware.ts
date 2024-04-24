import httpStatus from 'http-status';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError, wrapper } from '@repo/core';

const validateFn = (
  schema: AnyZodObject,
  type: 'body' | 'query' | 'params' | 'all',
) =>
  wrapper(async (req, _, next) => {
    try {
      if (type !== 'all') await schema.parseAsync(req[type]);
      else
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
      // call next
      next();
    } catch (error) {
      // zod error
      if (error instanceof ZodError)
        throw new BadRequestError({
          message: error.flatten().fieldErrors,
          statusCode: httpStatus.BAD_REQUEST,
          error: 'Validation Error',
        });

      // unknown error
      throw error;
    }
  });

export const validate = {
  // all validator
  all: (schema: AnyZodObject) => validateFn(schema, 'all'),
  // only body validator
  body: (schema: AnyZodObject) => validateFn(schema, 'body'),
  // only query validator
  query: (schema: AnyZodObject) => validateFn(schema, 'query'),
  // only params validator
  params: (schema: AnyZodObject) => validateFn(schema, 'params'),
};
