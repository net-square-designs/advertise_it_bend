import formatJoiErrors from '../../utils/formatJoiErrors';
import CategorySchema from './CategorySchema';
import { AppResponse } from '../../helpers/AppResponse';

const { createCategory } = CategorySchema;

const validateCreateCategory = async (req, res, next) => {
  try {
    // @ts-ignore
    await createCategory.validateAsync(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateCreateCategory };
