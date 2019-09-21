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
      // include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return profile;
  }

  /**
   *
   * @param {createData} data
   * @property {string} email
   * @property {string} phone
   *
   * @returns {Promise<*>} Response
   */
  static async create(data) {
    const {
      uniqueId,
      email,
      phone,
      password,
      secretKey,
      accountType,
      userProfile,
    } = data;

    const user = this.User.create(
      {
        uniqueId,
        email,
        phone,
        secretKey,
        accountType,
        password,
        Profile: userProfile,
      },
      {
        include: [{ model: this.Profile, as: 'Profile' }],
      },
    ).catch((error) => {
      throw new Error(error);
    });

    return user;
  }
}

export default ProfileRepo;
