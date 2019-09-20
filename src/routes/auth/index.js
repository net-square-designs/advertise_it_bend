import express from 'express';
import AuthController from '../../controllers/AuthController';
import validateCreateUser from './authValidations';

const authRouter = express.Router();

authRouter.post('/', validateCreateUser, AuthController.createUser);

export default authRouter;
