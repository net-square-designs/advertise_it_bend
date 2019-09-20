import UserRepo from '../repositories/UserRepo';
import response from '../helpers/responses';
import { hashPassword } from '../helpers/passwordHelpers';
import generateUniqueId from '../helpers/generateUniqueId';
import { generateUserAuthToken } from '../helpers/generateAuthToken';
import setupTokenData from '../helpers/tokenHelper';

/**
 *
 */
class AuthController {
  /**
   * @description create a new user
   * @param {*} req re
   * @param {*} res res
   *
   * @returns {Promise<*>} The Return Object
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
        return response.success(res, {
          msg: 'This email or phone number has been taking',
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

      return response.created(res, { token });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default AuthController;
