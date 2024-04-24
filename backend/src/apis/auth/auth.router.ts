import passport from 'passport';
import { Router } from 'express';
import { AuthEnum } from '@/constants';
import { makeController } from '@repo/core';
import { validate } from '@/shared/middlewares';
import { AuthController } from './auth.controller';
import { JwtAuth, LocalAuth } from './middlewares';
import { JwtStrategy, LocalStrategy } from './strategies';
import { emailDto, loginDto, registerDto, verifyEmailDto } from './dtos';

export const authRouter = (): Router => {
  // initialize passport strategies
  passport.use(AuthEnum.JWT, JwtStrategy);
  passport.use(AuthEnum.LOCAL, LocalStrategy);

  // create router
  const router = Router();

  // create controller
  const controller = makeController(AuthController);

  // initialize router
  router
    .route('/login')
    .post(validate.body(loginDto), LocalAuth, controller.getHandler('login'));
  router
    .route('/register')
    .post(validate.body(registerDto), controller.getHandler('register'));
  router
    .route('/verify-otp')
    .post(validate.body(verifyEmailDto), controller.getHandler('verifyOtp'));
  router
    .route('/resent-otp')
    .post(validate.body(emailDto), controller.getHandler('resentOtp'));
  router.route('/refresh-token').post(controller.getHandler('refresh'));
  router.route('/logout').delete(JwtAuth, controller.getHandler('logout'));

  return router;
};
