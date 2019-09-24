// Repos
import UserRepo from '../repositories/UserRepo';

// Helpers
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to Users
 */
class UserController {
  /**
   * @description controller method to make a user a promoter
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async makePromoter(req, res) {
    const { userId } = req.params;

    try {
      const user = await UserRepo.getById(userId);

      if (!user) {
        return AppResponse.notFound(res, {
          message: 'User not found',
        });
      }
      if (user.accountType === 'Promoter') {
        return AppResponse.badRequest(res, {
          message: 'User is already a promoter',
        });
      }

      await user.update({ accountType: 'Promoter' });
      /**
       * TODO: Remember to store the admin who updated the user
       * in a database for reference purpose.
       * const { id } = res.locals.admin;
       */
      return AppResponse.success(res, {
        message: 'Updated user to promoter succesfuly',
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default UserController;
