import formatJoiErrors from '../../utils/formatJoiErrors';
import ProductImageSchema from './ProductImageSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { createProductImages } = ProductImageSchema;

const validateCreateProductImages = async (req, res, next) => {
  try {
    // @ts-ignore
    await createProductImages.payload.validateAsync(req.body, {
      abortEarly: false,
    });
    // @ts-ignore
    await createProductImages.params.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateCreateProductImages };
