import express from 'express';

import { validateUpdateProfile } from './profileValidations';
import ProfileController from '../../controllers/ProfileController';
import { checkUserAuth } from '../../middlewares/auth';

const profileRouter = express.Router();

/**
 * update profile
 */
profileRouter.put(
  '/update',
  checkUserAuth,
  validateUpdateProfile,
  ProfileController.updateProfile,
);

export default profileRouter;
