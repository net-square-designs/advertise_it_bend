// Repos
import CategoryRepo from '../repositories/CategoryRepo';

// Helpers
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to products
 */
class CategoryController {
  /**
   * @description controller method to create a new category
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async create(req, res) {
    const { name, image } = req.body;
    // const { id } = res.locals.user || res.locals.admin;

    try {
      const category = await CategoryRepo.getByName(name);

      if (category) {
        return AppResponse.conflict(res, {
          message: 'A category with this exact name already exists',
        });
      }

      const newCategory = await CategoryRepo.create({ name, image });

      return AppResponse.created(res, { data: { newCategory } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * @description controller method to fetch paginated products
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async fetchAllCategories(req, res) {
    try {
      const categories = CategoryRepo.getAll();

      return AppResponse.success(res, { data: { categories } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default CategoryController;
