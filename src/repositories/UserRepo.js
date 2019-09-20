import Sequelize from 'sequelize';
import model from '../db/models';

const { User, Profile } = model;
const { Op } = Sequelize;
/**
 * User Repo
 */
class UserRepo {
  /**
   * @typedef {Sequelize.ModelCtor<Sequelize.Model>} Model
   * @typedef {{
   * uniqueId: string, email: string, password: string,
   * phone: string, secretKey: string, accountType: string,
   * userProfile: { firtstname: string, lastname: string }
   * }} createData
   */

  /**
   * @type {Model}
   */
  static get User() {
    return User;
  }

  /**
   *
   * @param {Object} data
   * @property {string} email
   * @property {string} phone
   *
   * @returns {Promise<Sequelize.Model>} Response
   */
  static async getByEmailOrPhone({ email, phone }) {
    const user = this.User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
      include: [{ model: Profile, as: 'Profile' }],
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
        include: [{ model: Profile, as: 'Profile' }],
      },
    ).catch((error) => {
      throw new Error(error);
    });

    return user;
  }
}

export default UserRepo;
