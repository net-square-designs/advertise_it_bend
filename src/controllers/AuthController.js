// Repos
import UserRepo from '../repositories/UserRepo';

// Helpers
import { hashPassword, comparePassword } from '../helpers/passwordHelpers';
import generateUniqueId from '../helpers/generateUniqueId';
import { generateUserAuthToken } from '../helpers/generateAuthToken';
import setupTokenData from '../helpers/tokenHelper';
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
        userProfile: { firtstname: firstName, lastname: lastName },
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
}

export default AuthController;
