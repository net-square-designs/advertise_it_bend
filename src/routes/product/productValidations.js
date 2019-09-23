import formatJoiErrors from '../../utils/formatJoiErrors';
import ProductSchema from './ProductSchema';
import { AppResponse } from '../../helpers/AppResponse';

// import { numberify } from '../../utils/objectHelper';

const { createProduct, productParams } = ProductSchema;

const validateCreateProduct = async (req, res, next) => {
  try {
    // @ts-ignore
    await createProduct.validateAsync(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateProductParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await productParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateCreateProduct, validateProductParams };
