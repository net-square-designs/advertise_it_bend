import express from 'express';

// Controllers
import ProductController from '../../controllers/ProductController';

// Middlewares
import { checkUserAuth, tryUserAuth } from '../../middlewares/auth';

// Validations
import {
  validateCreateProduct,
  validateProductParams,
} from './productValidations';
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
  validateProductParams,
  ProductController.addImages,
);

/**
 * fetch products
 */
productRouter.get('/', ProductController.fetchProducts);

/**
 * fetch one product
 */
productRouter.get(
  '/:productId',
  tryUserAuth,
  validateProductParams,
  ProductController.fetchOne,
);

/**
 * like a product
 */
productRouter.post(
  '/:productId/like',
  checkUserAuth,
  validateProductParams,
  ProductController.likeProduct,
);

/**
 * bookmark a product
 */
productRouter.post(
  '/:productId/bookmark',
  checkUserAuth,
  validateProductParams,
  ProductController.bookmarkProduct,
);

/**
 * bookmark a product
 */
productRouter.post(
  '/:productId/publish',
  checkUserAuth,
  validateProductParams,
  ProductController.publishProduct,
);

/**
 * bookmark a product
 */
productRouter.post(
  '/:productId/unpublish',
  checkUserAuth,
  validateProductParams,
  ProductController.unPublishProduct,
);

export default productRouter;
