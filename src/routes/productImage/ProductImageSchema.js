// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to auth
 */
class ProductImageSchema {
  /**
   * @description The schema used to validate the process of authenticating a user
   */
  static get createProductImages() {
    return {
      payload: Joi.object({
        images: Joi.array()
          .items({
            image: Joi.string().required(),
            isMainImage: Joi.boolean().required(),
          })
          .min(1)
          .max(4)
          .required(),
      }),
      params: Joi.object({
        productId: Joi.string().required(),
      }),
    };
  }
}

export default ProductImageSchema;
