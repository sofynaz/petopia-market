import { Router } from 'express';
import { JwtAuth } from '@/apis/auth';
import { makeController } from '@repo/core';
import { UserController } from './user.controller';

export const userRouter = () => {
  // make v1 router
  const router: Router = Router();

  // create controller
  const controller = makeController(UserController);

  // middleware
  router.use(JwtAuth);

  // initialize router
  router.route('/me').get(controller.getHandler('getMe'));

  return router;
};
