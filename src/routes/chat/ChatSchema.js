// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to message
 */
class ChatSchema {
  // /**
  //  * @description The schema used to validate the process of creating a new message
  //  */
  // static get createChat() {
  //   return Joi.object({
  //     message: Joi.string()
  //       .min(3)
  //       .max(1000)
  //       .required(),
  //     media: Joi.string()
  //       .min(3)
  //       .max(100),
  //     mediaType: Joi.string()
  //       .min(3)
  //       .max(25),
  //   });
  // }

  /**
   * @description The schema used to validate the message params endpoint
   */
  static get chatParams() {
    return Joi.object({
      chatId: Joi.string(),
    });
  }

  // /**
  //  * @description The schema used to validate the message query
  //  */
  // static get messageQuery() {
  //   return Joi.object({
  //     text: Joi.string()
  //       .min(2)
  //       .max(100)
  //       .required(),
  //   });
  // }
}

export default ChatSchema;
