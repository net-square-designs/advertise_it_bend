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
   *  categoryId?: number?,
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
   * @description Method to get a product by id and userId
   * @param {Function} usePagination
   * @param {{isPublished: boolean}} isPublished
   *
   * @returns {Promise<*>} Response
   */
  static async getByPagination(usePagination, { isPublished }) {
    const products = await this.Product.findAll({
      ...usePagination(),
      where: { [Op.or]: [{ isPublished }] },
      include: [
        { model: this.ProductImage, as: 'ProductImages' },
        { model: this.Profile, as: 'Owner' },
      ],
    }).catch((error) => {
      throw new Error(error);
    });

    return products;
  }

  /**
   * @description Method to get products matching a specific search criteria
   * @param {Function} usePagination
   * @param {{name: string}} name
   *
   * @returns {Promise<*>} Response
   */
  static async search(usePagination, { name }) {
    const products = await this.Product.findAll({
      ...usePagination(),
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
      include: [{ model: this.ProductImage, as: 'ProductImages' }],
    }).catch((error) => {
      throw new Error(error);
    });

    return products;
  }

  /**
   * @description Method to count products matching a specific search criteria
   * @param {Function} usePagination
   * @param {{name: string}} name
   *
   * @returns {Promise<*>} Response
   */
  static async countSearch(usePagination, { name }) {
    const products = await this.Product.count({
      ...usePagination(),
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    return products;
  }

  /**
   * @description Method to count products
   * @param {{isPublished: boolean}} data
   *
   * @returns {Promise<*>} Response
   */
  static async countProducts({ isPublished = true }) {
    const count = await this.Product.count({
      where: { [Op.or]: [{ isPublished }] },
    }).catch((error) => {
      throw new Error(error);
    });

    return count;
  }

  /**
   *
   * @param {createData} data
   *
   * @returns {Promise<*>} Response
   */
  static async create(data) {
    const {
      title, price, description, userId, categoryId = null,
    } = data;

    const product = this.Product.create({
      title,
      price,
      description,
      userId,
      categoryId,
      isPublished: false,
    }).catch((error) => {
      throw new Error(error);
    });

    return product;
  }

  /**
   *
   * @param {{ viewerId: number, productId: number }} data
   *
   * @returns {Promise<*>} Response
   */
  static async addView(data) {
    const { productId, viewerId } = data;

    const isViewedAlready = await this.ProductView.findOne({
      where: {
        [Op.and]: [{ productId }, { viewerId }],
      },
    });

    if (isViewedAlready) {
      return;
    }

    this.ProductView.create({
      productId,
      viewerId,
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   *
   * @param {{ likerId: number, productId: number }} data
   *
   * @returns {Promise<void>} Response
   */
  static async addLike(data) {
    const { productId, likerId } = data;

    const isAlreadyLiked = await this.ProductLike.findOne({
      where: {
        [Op.and]: [{ productId }, { likerId }],
      },
    });

    if (isAlreadyLiked) {
      return;
    }

    this.ProductLike.create({
      productId,
      likerId,
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   *
   * @param {{ bookmarkerId: number, productId: number }} data
   *
   * @returns {Promise<void>} Response
   */
  static async addBookmark(data) {
    const { productId, bookmarkerId } = data;

    const isAlreadyBookmarked = await this.ProductBookmark.findOne({
      where: {
        [Op.and]: [{ productId }, { bookmarkerId }],
      },
    });

    if (isAlreadyBookmarked) {
      return;
    }

    this.ProductBookmark.create({
      productId,
      bookmarkerId,
    }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default ProductRepo;
