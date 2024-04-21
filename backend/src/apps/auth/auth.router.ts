import { Router } from 'express';
import { LocalAuth } from './middlewares';
import { makeController } from '@repo/core';
import { AuthController } from './auth.controller';

export const authRouter = (): Router => {
  // create router
  const router = Router();

  // create controller
  const { getHandler } = makeController(AuthController);

  // initialize router
  router.route('/login').post(LocalAuth, getHandler('login'));
  router.route('/register').post(getHandler('register'));

  return router;
};
