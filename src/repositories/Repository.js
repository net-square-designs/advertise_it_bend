// eslint-disable-next-line no-unused-vars
import Sequelize from 'sequelize';

// Model
import model from '../db/models';

const {
  User, Profile, Product, ProductImage,
} = model;

/**
 * Repository
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

  /**
   * @type {Model}
   */
  static get Product() {
    return Product;
  }

  /**
   * @type {Model}
   */
  static get ProductImage() {
    return ProductImage;
  }
}

export default Repository;
