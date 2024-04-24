import { RoleEnum } from '@/constants';
import { wrapper, ForbiddenError } from '@repo/core';
import type { RequestHandler } from 'express';

export const permission = (...roles: RoleEnum[]): RequestHandler =>
  wrapper(async (req, _, next) => {
    const { user } = req;

    if (!roles) return true;

    if (!user) return false;

    const checker = user && roles.includes(user.role);

    if (!checker)
      throw new ForbiddenError(
        `User have not permission to access ${req.originalUrl}`,
      );

    next();
  });

export const onlyAdmin: RequestHandler = permission(RoleEnum.ADMIN);

export const adminOrSeller: RequestHandler = permission(
  RoleEnum.ADMIN,
  RoleEnum.SELLER,
);
