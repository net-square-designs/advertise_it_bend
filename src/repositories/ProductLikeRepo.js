import Sequelize from 'sequelize';

import Repository from './Repository';

const { Op } = Sequelize;
/**
 * Product Like Repo
 */
class ProductLikeRepo extends Repository {
  /**
   * @typedef {{
   *  title: string, price: string,
   *  description: string, userId: number,
   *  categoryId?: number?,
   * }} createData
   */

  /**
   * @description Method to get a like by likerId and productId
   * @typedef {{ productId: string, likerId: string }} data
   * @param {data} data
   *
   * @returns {Promise<*>} Response
   */
  static async getBylikerIdAndProductId({ likerId, productId }) {
    const productLike = this.ProductLike.findOne({
      where: {
        [Op.and]: [{ productId }, { likerId }],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    return productLike;
  }

  /**
   *
   * @param {{ likerId: number, productId: number }} data
   *
   * @returns {Promise<any | boolean>} Response
   */
  static async create(data) {
    const { productId, likerId } = data;

    return this.ProductLike.create({
      productId,
      likerId,
    }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default ProductLikeRepo;
