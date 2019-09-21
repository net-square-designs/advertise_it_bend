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
   * @description The schema used to validate the process of authenticating a user
   */
  static get loginUserSchema() {
    return Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    });
  }

  /**
   * @description The schema used to validate the process of authenticating a user
   */
  static get resetPasswordSchema() {
    return {
      payload: Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
      }),
      params: Joi.object({
        resetId: Joi.string()
          .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
          .error(
            new Error('The reset key supplied has an invalid format'),
          ),
      }),
    };
  }
}

export default ProductSchema;
