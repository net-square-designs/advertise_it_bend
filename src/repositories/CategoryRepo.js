import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * User Repo
 */
class CategoryRepo extends Repository {
  /**
   * @typedef {{
   *  title: string, price: string,
   *  description: string, userId: number,
   * }} createData
   */

  /**
   * @description Method to get a category by name
   * @param {string} name
   *
   * @returns {Promise<*>} Response
   */
  static async getByName(name) {
    const category = this.Category.findOne({
      where: {
        [Op.or]: [{ name }],
      },
      // include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return category;
  }

  /**
   * @description Method to get a category by id
   * @param {string} id
   *
   * @returns {Promise<*>} Response
   */
  static async getById(id) {
    const category = this.Category.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      // include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return category;
  }

  /**
   * @description Method to get a category using it's name and include some products
   * @param {Function} usePagination
   * @param {{name: string}} name
   *
   * @returns {Promise<*>} Response
   */
  static async getCategoryProductsByName(usePagination, { name }) {
    const paginatedCategories = await this.Category.findAll({
      ...usePagination(),
      where: { [Op.or]: [{ name }] },
      include: [{ model: this.Product, as: 'Products' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return paginatedCategories;
  }

  /**
   * @description Method to count categories
   *
   * @returns {Promise<*>} Response
   */
  static async getAll() {
    const categories = await this.Product.findAndCountAll({}).catch(
      (error) => {
        throw new Error(error);
      },
    );

    return categories;
  }

  /**
   * @description Add new category
   * @param {{name: string}} data
   *
   * @returns {Promise<*>} Response
   */
  static async create(data) {
    const { name } = data;

    const category = this.Category.create({
      name,
    }).catch((error) => {
      throw new Error(error);
    });

    return category;
  }
}

export default CategoryRepo;
