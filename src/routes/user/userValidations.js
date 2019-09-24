import formatJoiErrors from '../../utils/formatJoiErrors';
import UserSchema from './UserSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { userParams } = UserSchema;

const validateUserParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await userParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateUserParams };
