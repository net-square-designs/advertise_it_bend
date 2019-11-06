// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';
import formatJoiErrors from '../utils/formatJoiErrors';
import { AppResponse } from '../helpers/AppResponse';
import { numberify } from '../utils/objectHelper';

const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1),
  pageSize: Joi.number()
    .integer()
    .min(1)
    .max(25),
})
  .unknown()
  .with('page', 'pageSize')
  .with('pageSize', 'page');

const usePagination = async (req, res, next) => {
  try {
    // @ts-ignore
    await paginationSchema.validateAsync(req.query, {
      abortEarly: false,
    });

    const { page = 1, pageSize = 10 } = numberify(req.query);

    const offset = pageSize * (page > 0 ? page - 1 : page);
    const limit = pageSize;

    res.locals.usePagination = () => ({
      offset,
      limit,
    });

    res.locals.paginationData = {
      page,
      pageSize,
    };

    // return;

    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { paginationSchema, usePagination };
