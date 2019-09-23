import formatJoiErrors from '../../utils/formatJoiErrors';
import FollowSchema from './FollowSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { followParams } = FollowSchema;

const validateFollowParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await followParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateFollowParams };
