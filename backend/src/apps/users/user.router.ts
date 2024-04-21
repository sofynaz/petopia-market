import { Router } from 'express';
import { makeController } from '@repo/core';
import { UserController } from './user.controller';

export const userRouter = () => {
  // make v1 router
  const router: Router = Router();

  // create controller
  const { getHandler } = makeController(UserController);

  // initialize router
  router.route('/').get(getHandler('getMe'));

  return router;
};
