import express from 'express';
import AuthController from '../../controllers/AuthController';
import { validateCreateUser, validateLoginUser } from './authValidations';

const authRouter = express.Router();

authRouter.post('/', validateCreateUser, AuthController.createUser);
authRouter.post(
  '/login',
  validateLoginUser,
  AuthController.authenticateUser,
);

export default authRouter;
