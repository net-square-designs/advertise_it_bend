import formatJoiErrors from '../../utils/formatJoiErrors';
import ProfileSchema from './ProfileSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { updateProfileSchema } = ProfileSchema;

const validateUpdateProfile = async (req, res, next) => {
  try {
    // @ts-ignore
    await updateProfileSchema.payload.validateAsync(req.body, {
      abortEarly: false,
    });
    // @ts-ignore
    await updateProfileSchema.headers.validateAsync(req.headers, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateUpdateProfile };
