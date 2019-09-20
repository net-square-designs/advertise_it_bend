import formatJoiErrors from '../../utils/formatJoiErrors';
import AuthSchema from './AuthSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { createUserSchema, loginUserSchema } = AuthSchema;

const validateCreateUser = async (req, res, next) => {
  try {
    // @ts-ignore
    await createUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateLoginUser = async (req, res, next) => {
  try {
    // @ts-ignore
    await loginUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateCreateUser, validateLoginUser };
