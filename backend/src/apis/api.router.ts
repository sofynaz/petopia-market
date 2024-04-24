import { Router } from 'express';
import { authRouter } from './auth';

export const apiRouter = (): Router => {
  // make v1 router
  const router = Router();

  // api router are init
  router.use('/auth', authRouter());

  return router;
};
