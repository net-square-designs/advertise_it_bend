import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * User Repo
 */
class ProfileRepo extends Repository {
  /**
   * @typedef {{
   *  uniqueId: string, email: string, password: string,
   *  phone: string, secretKey: string, accountType: string,
   *  userProfile: { firtstname: string, lastname: string }
   * }} createData
   */

  /**
   * @description Method to get a profile by id
   * @param {string} userId
   *
   * @returns {Promise<*>} Response
   */
  static async getById(userId) {
    const profile = this.Profile.findOne({
      where: {
        [Op.or]: [{ userId }],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    return profile;
  }
}

export default ProfileRepo;
