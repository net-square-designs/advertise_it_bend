import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * Admin Repo
 */
class AdminRepo extends Repository {
  /**
   * @typedef {{
   *  uniqueId: string, email: string, password: string,
   *  phone: string, secretKey: string, accountType: string,
   *  level: string
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
    const admin = this.Admin.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
      // include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return admin;
  }

  /**
   * @description Method to get a user by email
   * @param {string} email
   *
   * @returns {Promise<*>} Response
   */
  static async getByEmail(email) {
    const admin = this.Admin.findOne({
      where: {
        [Op.or]: [{ email }],
      },
      // include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return admin;
  }

  /**
   * @description Method to get a user by email
   * @param {string} id
   *
   * @returns {Promise<*>} Response
   */
  static async getById(id) {
    const admin = this.Admin.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      // include: [{ model: this.Profile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return admin;
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
      uniqueId, email, phone, password, secretKey, level,
    } = data;

    const admin = this.Admin.create(
      {
        uniqueId,
        phone,
        email,
        password,
        secretKey,
        level,
      },
      {
        // include: [{ model: this.Profile, as: 'Profile' }],
      },
    ).catch((error) => {
      throw new Error(error);
    });

    return admin;
  }
}

export default AdminRepo;
