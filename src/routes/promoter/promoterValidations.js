import formatJoiErrors from '../../utils/formatJoiErrors';
import PromoterSchema from './PromoterSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { promoterParams } = PromoterSchema;

const validatePromoterParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await promoterParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validatePromoterParams };
