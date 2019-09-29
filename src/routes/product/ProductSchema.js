// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to auth
 */
class ProductSchema {
  /**
   * @description The schema used to validate the process of creating a new user
   */
  static get createProduct() {
    return Joi.object({
      title: Joi.string()
        .min(3)
        .max(25)
        .required(),
      price: Joi.number()
        .min(0)
        .required(),
      description: Joi.string()
        .min(3)
        .max(200)
        .required(),
      categoryName: Joi.string()
        .min(3)
        .max(200),
    });
  }

  /**
   * @description The schema used to validate the process of creating a new user
   */
  static get productParams() {
    return Joi.object({
      productId: Joi.number().integer(),
    });
  }

  /**
   * @description The schema used to validate the product query
   */
  static get productQuery() {
    return Joi.object({
      name: Joi.string()
        .min(2)
        .required(),
    });
  }
}

export default ProductSchema;
