// Repos
import ProfileRepo from '../repositories/ProfileRepo';

// Helpers | Utils
import { AppResponse } from '../helpers/AppResponse';
import { getPayload } from '../utils/getPayload';

/**
 * Controller that handles everything relating to auth
 */
class ProfileController {
  /**
   * @description controller method to update a profile
   * @param {*} req re
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async updateProfile(req, res) {
    const { id } = res.locals.user;

    try {
      const profile = await ProfileRepo.getById(id);

      if (!profile) {
        return AppResponse.notFound(res, {
          message: 'Unable to update profiles',
          errors: { details: 'Profile not found' },
        });
      }

      const updatedProfile = await profile.update({
        ...getPayload(req),
      });

      return AppResponse.success(res, {
        message: 'Profile updated successfully',
        data: { updatedProfile },
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default ProfileController;
