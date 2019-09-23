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
}

export default ProductSchema;
