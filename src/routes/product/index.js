import express from 'express';

import { validateCreateProduct } from './productValidations';
import ProductController from '../../controllers/ProductController';
import { checkUserAuth } from '../../middlewares/auth';

const productRouter = express.Router();

/**
 * create new product
 */
productRouter.post(
  '/',
  checkUserAuth,
  validateCreateProduct,
  ProductController.create,
);

export default productRouter;
