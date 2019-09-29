import express from 'express';

// Controllers
import CategoryController from '../../controllers/CategoryController';

// Middlewares
import { ensureAdmin } from '../../middlewares/auth';

// Validations
import { validateCreateCategory } from './categoryValidations';

const categoryRouter = express.Router();

/**
 * create new category
 */
categoryRouter.post(
  '/',
  ensureAdmin,
  validateCreateCategory,
  CategoryController.create,
);

/**
 * fetch categories
 */
categoryRouter.get('/', CategoryController.fetchAllCategories);

export default categoryRouter;
