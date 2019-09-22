// Repos
import ProductRepo from '../repositories/ProductRepo';
import ProductImageRepo from '../repositories/ProductImageRepo';

// Helpers
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to products
 */
class ProductController {
  /**
   * @description controller method to create a new product
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async create(req, res) {
    const { title, price, description } = req.body;
    const { id } = res.locals.user;

    try {
      const product = await ProductRepo.getByTitleAndUserId({
        title,
        userId: id,
      });

      if (product) {
        return AppResponse.conflict(res, {
          message:
            'You already have another product matching this exact name',
        });
      }

      const newProduct = await ProductRepo.create({
        title,
        price,
        description,
        userId: id,
      });

      return AppResponse.created(res, { data: { newProduct } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * @description controller method to create a new product
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async addImages(req, res) {
    const { images } = req.body;
    const { productId } = req.params;
    const { id } = res.locals.user;
    const maxImageLength = 4;

    try {
      const product = await ProductRepo.getByIdAndUserId({
        id: productId,
        userId: id,
      });

      if (!product) {
        return AppResponse.notFound(res, {
          message: 'Product not found',
        });
      }

      if (product.ProductImages.length > maxImageLength) {
        return AppResponse.conflict(res, {
          message: 'Product already has 4 or more images',
        });
      }
      if (product.ProductImages.length + images.length > maxImageLength) {
        return AppResponse.conflict(res, {
          message: `Product already has ${
            product.ProductImages.length
          } images. You can add a max of ${maxImageLength
            - product.ProductImages.length} more`,
        });
      }

      const productImages = images.map(image => ({
        ...image,
        productId,
      }));

      const addedImages = await ProductImageRepo.createMany(productImages);

      return AppResponse.created(res, {
        data: { addedImages },
        message: 'Added images successfully',
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default ProductController;
