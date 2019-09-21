// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to auth
 */
class ProfileSchema {
  /**
   * @description The schema used to validate the process of authenticating a user
   */
  static get updateProfileSchema() {
    return {
      payload: Joi.object()
        .keys({
          firstname: Joi.string()
            .min(3)
            .max(15),
          lastname: Joi.string()
            .min(3)
            .max(15),
          middlename: Joi.string()
            .min(3)
            .max(15),
          image: Joi.string().min(3),
          bio: Joi.string()
            .min(3)
            .max(200),
          storeName: Joi.string()
            .min(3)
            .max(25),
          gender: Joi.string().valid('Male', 'Female'),
          dateOfBirth: Joi.string(),
          nationality: Joi.string()
            .min(3)
            .max(15),
          stateOfOrigin: Joi.string()
            .min(3)
            .max(15),
          stateOfResidence: Joi.string()
            .min(3)
            .max(15),
        })
        .or(
          'firstname',
          'lastname',
          'middlename',
          'image',
          'bio',
          'storeName',
          'gender',
          'dateOfBirth',
          'nationality',
          'stateOfOrigin',
          'stateOfResidence',
        ),
      headers: Joi.object({
        Authorization: Joi.string()
          .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
          .error(new Error('Invalid Authorization key format')),
      }).unknown(),
    };
  }
}

export default ProfileSchema;
