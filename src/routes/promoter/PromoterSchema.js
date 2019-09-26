// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to User
 */
class PromoterSchema {
  /**
   * @description The schema used to validate the params on the user endpoint
   */
  static get promoterParams() {
    return Joi.object({
      userId: Joi.number().integer(),
    });
  }
}

export default PromoterSchema;
