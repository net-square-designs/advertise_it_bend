// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to message
 */
class MessageSchema {
  /**
   * @description The schema used to validate the process of creating a new message
   */
  static get createMessage() {
    return Joi.object({
      message: Joi.string()
        .min(1)
        .max(1000)
        .required(),
      media: Joi.string()
        .min(3)
        .max(100),
      mediaType: Joi.string()
        .min(3)
        .max(25),
    });
  }

  /**
   * @description The schema used to validate the message params endpoint
   */
  static get messageParams() {
    return Joi.object({
      receiverId: Joi.number().integer(),
    });
  }

  /**
   * @description The schema used to validate the message query
   */
  static get messageQuery() {
    return Joi.object({
      text: Joi.string()
        .min(2)
        .max(100)
        .required(),
    });
  }
}

export default MessageSchema;
