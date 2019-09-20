import response from '../../utils/responses';
import formatJoiErrors from '../../utils/formatJoiErrors';
import AuthSchema from './AuthSchema';

const { createUserSchema } = AuthSchema;

const validateCreateUser = async (req, res, next) => {
  try {
    // @ts-ignore
    await createUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return response.badRequest({ res, errors: formatJoiErrors(errors) });
  }
};

export default validateCreateUser;
