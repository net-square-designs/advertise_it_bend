import express from 'express';
import passport from 'passport';

// Controllers
import AuthController from '../../controllers/AuthController';
import {
  validateCreateUser,
  validateLoginUser,
  validateResetPassword,
} from './authValidations';

const authRouter = express.Router();

/**
 * signup user
 */
authRouter.post('/', validateCreateUser, AuthController.createUser);
/**
 * login user
 */
authRouter.post(
  '/login',
  validateLoginUser,
  AuthController.authenticateUser,
);

/**
 * Update password
 */
authRouter.put(
  '/reset-password/:resetId',
  validateResetPassword,
  AuthController.resetUserPassword,
);

/**
 * facebook auth
 */
authRouter.post(
  '/facebook',
  passport.authenticate('facebook-token', { session: false }),
  AuthController.facebookAuth,
);

export default authRouter;
