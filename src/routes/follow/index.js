import express from 'express';

// Controllers
import FollowController from '../../controllers/FollowController';

// Middlewares
import { checkUserAuth } from '../../middlewares/auth';

// Validations
import { validateFollowParams } from './followValidations';

const followRouter = express.Router();

/**
 * get following metrics
 */
followRouter.get('/', checkUserAuth, FollowController.getMetrics);

/**
 * follow a user
 */
followRouter.post(
  '/:followeeId',
  checkUserAuth,
  validateFollowParams,
  FollowController.addFollower,
);

/**
 * get followers count
 */
followRouter.get(
  '/count-followers',
  checkUserAuth,
  FollowController.countFollowers,
);

/**
 * get following count
 */
followRouter.get(
  '/count-following',
  checkUserAuth,
  FollowController.countFollowing,
);

export default followRouter;
