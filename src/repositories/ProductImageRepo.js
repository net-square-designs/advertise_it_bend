// import Sequelize from 'sequelize';

import Repository from './Repository';

// const { Op } = Sequelize;
/**
 * User Repo
 */
class ProductImageRepo extends Repository {
  /**
   * @typedef {{
   *  image: string, isMainImage: string, productId: string
   * }} createData
   */

  /**
   *
   * @param {createData[]} images
   *
   * @returns {Promise<*>} Response
   */
  static async createMany(images) {
    const productImage = this.ProductImage.bulkCreate(images).catch(
      (error) => {
        throw new Error(error);
      },
    );

    return productImage;
  }
}

export default ProductImageRepo;
