import express from 'express';

// Controllers
import PromoterController from '../../controllers/PromoterController';

// Middlewares
import { ensureAdmin, checkUserAuth } from '../../middlewares/auth';

// Validations
import { validatePromoterParams } from './promoterValidations';

const promoterRouter = express.Router();

/**
 * Post request to become a promoter
 * [UserGuard]
 */
promoterRouter.post('/', checkUserAuth, PromoterController.createRequest);

/**
 * Update a user account type to promoter
 * [AdminGuard]
 */
promoterRouter.put(
  '/:userId/make-promoter',
  ensureAdmin,
  validatePromoterParams,
  PromoterController.approveBecomePromoter,
);

export default promoterRouter;
