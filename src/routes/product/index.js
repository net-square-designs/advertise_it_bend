import express from 'express';

// Controllers
import ProductController from '../../controllers/ProductController';

// Middlewares
import { checkUserAuth, tryUserAuth } from '../../middlewares/auth';

// Validations
import { validateCreateProduct } from './productValidations';
import { validateCreateProductImages } from '../productImage/productImageValidations';

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

/**
 * add images to a product
 */
productRouter.post(
  '/:productId/images',
  checkUserAuth,
  validateCreateProductImages,
  ProductController.addImages,
);

/**
 * fetch products
 */
productRouter.get('/', ProductController.fetchProducts);

/**
 * fetch one product
 */
productRouter.get('/:productId', tryUserAuth, ProductController.fetchOne);

export default productRouter;
