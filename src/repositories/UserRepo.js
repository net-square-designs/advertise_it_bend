import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * User Repo
 */
class UserRepo extends Repository {
  /**
   * @typedef {{
   *  uniqueId: string, email: string, password: string,
   *  phone: string, secretKey: string, accountType: string,
   *  userProfile: { firtstname: string, lastname: string }
   * }} createData
   */

  /**
   *
   * @param {Object} data
   * @property {string} email
   * @property {string} phone
   *
   * @returns {Promise<*>} Response
   */
  static async getByEmailOrPhone({ email, phone }) {
    const user = this.User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
      include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return user;
  }

  /**
   * @description Method to get a user by email
   * @param {string} email
   *
   * @returns {Promise<*>} Response
   */
  static async getByEmail(email) {
    const user = this.User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
      include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return user;
  }

  /**
   * @description Method to get a user by email
   * @param {string} id
   *
   * @returns {Promise<*>} Response
   */
  static async getById(id) {
    const user = this.User.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return user;
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

export default UserRepo;
