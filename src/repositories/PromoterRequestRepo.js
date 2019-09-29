import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * User Repo
 */
class PromoterRequestRepo extends Repository {
  /**
   * @description Method to get a PromoterRequest by userId
   * @param {string} userId
   *
   * @returns {Promise<*>} Response
   */
  static async getByUserId(userId) {
    const request = this.PromoterRequest.findOne({
      where: {
        [Op.or]: [{ userId }],
      },
      // include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return request;
  }

  /**
   *
   * @param {{
   *  userId: number, facebookUrl: string?,
   *  twitterUrl: string?, instagramUrl: string?,
   * }} data
   *
   * @returns {Promise<*>} Response
   */
  static async create(data) {
    const request = this.PromoterRequest.create(
      { ...data, status: 'Pending' },
      {
        // include: [{ model: this.Profile, as: 'Profile' }],
      },
    ).catch((error) => {
      throw new Error(error);
    });

    return request;
  }
}

export default PromoterRequestRepo;
