// Repos
import ProductRepo from '../repositories/ProductRepo';

// Helpers
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to products
 */
class ProductController {
  /**
   * @description controller method to create a new product
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async create(req, res) {
    const { title, price, description } = req.body;
    const { id } = res.locals.user;

    try {
      const product = await ProductRepo.getByTitleAndUserId({
        title,
        userId: id,
      });

      if (product) {
        return AppResponse.conflict(res, {
          message:
            'You already have another product matching this exact name',
        });
      }

      const newProduct = await ProductRepo.create({
        title,
        price,
        description,
        userId: id,
      });

      return AppResponse.created(res, { data: { newProduct } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  // /**
  //  * @description controller method to authenticate a user
  //  * @param {*} req re
  //  * @param {*} res res
  //  *
  //  * @returns {Promise<AppResponse>} The Return Object
  //  */
  // static async authenticateUser(req, res) {
  //   const { email, password } = req.body;

  //   try {
  //     const user = await UserRepo.getByEmail(email);

  //     if (!user) {
  //       return AppResponse.notFound(res, {
  //         message: 'Invalid login credentials',
  //       });
  //     }

  //     const isPasswordValid = comparePassword(password, user.password);

  //     if (!isPasswordValid) {
  //       return AppResponse.conflict(res, {
  //         message: 'Invalid login credentials',
  //       });
  //     }
  //     const token = generateUserAuthToken(setupTokenData(user));

  //     return AppResponse.success(res, {
  //       message: 'Authenticated successfully',
  //       data: { token },
  //     });
  //   } catch (errors) {
  //     return AppResponse.serverError(res, { errors });
  //   }
  // }

  // /**
  //  * @description controller method to reset a user's password
  //  * @param {*} req re
  //  * @param {*} res res
  //  *
  //  * @returns {Promise<AppResponse>} The Return Object
  //  */
  // static async resetUserPassword(req, res) {
  //   const { oldPassword, newPassword } = req.body;
  //   const { resetId } = req.params;

  //   const decodedToken = verifyToken(resetId);

  //   if (!decodedToken) {
  //     return AppResponse.forbidden(res, {
  //       message: 'Invalid password reset credentials',
  //     });
  //   }

  //   try {
  //     const { id } = decodedToken;
  //     const user = await UserRepo.getById(id);

  //     if (!user) {
  //       return AppResponse.notFound(res, {
  //         message: 'Unable to process process password reset request',
  //       });
  //     }

  //     const isPasswordValid = comparePassword(oldPassword, user.password);

  //     if (!isPasswordValid) {
  //       return AppResponse.conflict(res, {
  //         message: 'Your old password is wrong',
  //       });
  //     }

  //     const hashedPassword = hashPassword(newPassword.trim());

  //     await user.update({
  //       password: hashedPassword,
  //       secretKey: `${generateUniqueId()}-${user.email}`,
  //     });

  //     return AppResponse.success(res, {
  //       message: 'Password updated successfully',
  //     });
  //   } catch (errors) {
  //     return AppResponse.serverError(res, { errors });
  //   }
  // }
}

export default ProductController;
