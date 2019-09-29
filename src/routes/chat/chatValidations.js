import formatJoiErrors from '../../utils/formatJoiErrors';
import ChatSchema from './ChatSchema';
import { AppResponse } from '../../helpers/AppResponse';

const { chatParams } = ChatSchema;

const validateChatParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await chatParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateChatParams };
