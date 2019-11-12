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
        productId: Joi.number()
          .integer()
          .required(),
      }),
    };
  }

  /**
   * @description The schema used to validate the process of authenticating a user
   */
  static get productImages() {
    const kb = 1000;
    const mb = 1000 * kb;
    const maxImageSize = 3 * mb;
    return {
      files: Joi.array()
        .items({
          fieldName: Joi.optional(),
          path: Joi.string().required(),
          headers: Joi.optional(),
          name: Joi.string().required(),
          originalFilename: Joi.string().required(),
          type: Joi.string()
            .valid('image/png', 'image/jpeg')
            .required(),
          size: Joi.number().max(maxImageSize),
        })
        .min(1)
        .max(4)
        .required(),
    };
  }
}

export default ProductImageSchema;
