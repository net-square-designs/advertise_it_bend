import formatJoiErrors from '../../utils/formatJoiErrors';
import MessageSchema from './MessageSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { createMessage, messageParams, messageQuery } = MessageSchema;

const validateCreateMessage = async (req, res, next) => {
  try {
    // @ts-ignore
    await createMessage.validateAsync(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateMessageParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await messageParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateMessageQuery = async (req, res, next) => {
  try {
    // @ts-ignore
    await messageQuery.validateAsync(req.query, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export {
  validateCreateMessage,
  validateMessageParams,
  validateMessageQuery,
};
