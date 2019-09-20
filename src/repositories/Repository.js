// eslint-disable-next-line no-unused-vars
import Sequelize from 'sequelize';

// Model
import model from '../db/models';

const { User, Profile } = model;
/**
 * User Repo
 */
class Repository {
  /**
   * @typedef {Sequelize.ModelCtor<Sequelize.Model>} Model
   */

  /**
   * @type {Model}
   */
  static get User() {
    return User;
  }

  /**
   * @type {Model}
   */
  static get Profile() {
    return Profile;
  }
}

export default Repository;
