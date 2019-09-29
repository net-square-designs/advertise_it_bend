// Repos
import UserRepo from '../repositories/UserRepo';

// Helpers
import { hashPassword, comparePassword } from '../helpers/passwordHelpers';
import generateUniqueId from '../helpers/generateUniqueId';
import { generateUserAuthToken } from '../helpers/generateAuthToken';
import { setupTokenData, verifyToken } from '../helpers/tokenHelper';
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to auth
 */
class AuthController {
  /**
   * @description controller method to create a new user
   * @param {*} req re
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async createUser(req, res) {
    const {
      email,
      password,
      phone,
      firstName,
      lastName,
      accountType,
    } = req.body;

    try {
      const user = await UserRepo.getByEmailOrPhone({ email, phone });

      if (user) {
        return AppResponse.conflict(res, {
          message: 'This email or phone has been taken',
        });
      }

      const hashedPassword = hashPassword(password);
      const newUser = await UserRepo.create({
        email,
        phone,
        uniqueId: generateUniqueId(),
        password: hashedPassword,
        secretKey: `${generateUniqueId()}-${email}`,
        accountType,
        userProfile: { firstname: firstName, lastname: lastName },
      });

      const token = generateUserAuthToken(setupTokenData(newUser));

      return AppResponse.created(res, { data: { token } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * @description controller method to authenticate a user
   * @param {*} req re
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async authenticateUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserRepo.getByEmail(email);

      if (!user) {
        return AppResponse.notFound(res, {
          message: 'Invalid login credentials',
        });
      }

      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        return AppResponse.conflict(res, {
          message: 'Invalid login credentials',
        });
      }
      const token = generateUserAuthToken(setupTokenData(user));

      return AppResponse.success(res, {
        message: 'Authenticated successfully',
        data: { token },
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * @description controller method to reset a user's password
   * @param {*} req re
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async resetUserPassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const { resetId } = req.params;

    const decodedToken = verifyToken(resetId);

    if (!decodedToken) {
      return AppResponse.forbidden(res, {
        message: 'Invalid password reset credentials',
      });
    }

    try {
      const { id } = decodedToken;
      const user = await UserRepo.getById(id);

      if (!user) {
        return AppResponse.notFound(res, {
          message: 'Unable to process process password reset request',
        });
      }

      const isPasswordValid = comparePassword(oldPassword, user.password);

      if (!isPasswordValid) {
        return AppResponse.conflict(res, {
          message: 'Your old password is wrong',
        });
      }

      const hashedPassword = hashPassword(newPassword.trim());

      await user.update({
        password: hashedPassword,
        secretKey: `${generateUniqueId()}-${user.email}`,
      });

      return AppResponse.success(res, {
        message: 'Password updated successfully',
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * @description controller method to authenticate a user
   * @param {*} req re
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async facebookAuth(req, res) {
    try {
      if (!req.user) {
        return AppResponse.unAuthorized(res, {
          message: 'User facebook credentials',
        });
      }
      const { user } = req;
      const token = generateUserAuthToken(setupTokenData(user));

      return AppResponse.success(res, {
        message: 'Authenticated user via facebook successfully',
        data: { token },
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default AuthController;
