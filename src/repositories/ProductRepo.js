import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * User Repo
 */
class ProductRepo extends Repository {
  /**
   * @typedef {{
   *  title: string, price: string,
   *  description: string, userId: number,
   * }} createData
   */

  /**
   * @description Method to get a product by title
   * @param {string} title
   *
   * @returns {Promise<*>} Response
   */
  static async getByTitle(title) {
    const product = this.Product.findOne({
      where: {
        [Op.or]: [{ title }],
      },
      include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return product;
  }

  /**
   * @description Method to get a product by title
   * @typedef {{ title: string, userId }} data
   * @param {data} data
   *
   * @returns {Promise<*>} Response
   */
  static async getByTitleAndUserId({ title, userId }) {
    const product = this.Product.findOne({
      where: {
        [Op.and]: [{ title }, { userId }],
      },
      include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return product;
  }

  /**
   * @description Method to get a product by id
   * @param {string} id
   *
   * @returns {Promise<*>} Response
   */
  static async getById(id) {
    const product = this.Product.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return product;
  }

  /**
   * @description Method to get a product by id and userId
   * @param {{ id: string, userId }} data
   *
   * @returns {Promise<*>} Response
   */
  static async getByIdAndUserId({ id, userId }) {
    const product = this.Product.findOne({
      where: {
        [Op.and]: [{ id }, { userId }],
      },
      include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return product;
  }

  /**
   *
   * @param {createData} data
   *
   * @returns {Promise<*>} Response
   */
  static async create(data) {
    const {
      title, price, description, userId,
    } = data;

    const product = this.Product.create({
      title,
      price,
      description,
      userId,
      isPublished: false,
    }).catch((error) => {
      throw new Error(error);
    });

    return product;
  }
}

export default ProductRepo;
