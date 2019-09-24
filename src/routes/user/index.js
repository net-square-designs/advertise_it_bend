import express from 'express';

// Controllers
// import FollowController from '../../controllers/FollowController';

// Middlewares
import { ensureAdmin } from '../../middlewares/auth';

// Validations
import { validateUserParams } from './userValidations';
import UserController from '../../controllers/UserController';

const userRouter = express.Router();

/**
 * get following metrics
 */
userRouter.post(
  '/:userId/make-promoter',
  ensureAdmin,
  validateUserParams,
  UserController.makePromoter,
);

export default userRouter;
