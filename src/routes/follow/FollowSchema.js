// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to Follow
 */
class FollowSchema {
  /**
   * @description The schema used to validate the params on the follow endpoint
   */
  static get followParams() {
    // followee is the person being followed
    // follower is the person who follows
    return Joi.object({
      followeeId: Joi.number().integer(),
    });
  }
}

export default FollowSchema;
