// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to auth
 */
class AuthSchema {
  /**
   * @description The schema used to validate the process of creating a new user
   */
  static get createUserSchema() {
    return Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      firtsname: Joi.string()
        .min(3)
        .max(15)
        .required(),
      lastname: Joi.string()
        .min(3)
        .max(15)
        .required(),
      phone: Joi.string()
        .length(11)
        .required(),
      accountType: Joi.string()
        .valid('Customer', 'Merchant')
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
}

export default AuthSchema;
