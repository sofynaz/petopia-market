import { Router } from 'express';
import { authRouter } from './auth';
import { userRouter } from './users';

const appRouter = () => {
  // make v1 router
  const router: Router = Router();

  // api router are init
  router.use('/auth', authRouter());
  router.use('/users', userRouter());

  return router;
};

export default appRouter;
