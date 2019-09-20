import express from 'express';
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

export default authRouter;
