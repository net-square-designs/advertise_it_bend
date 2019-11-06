// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';
import formatJoiErrors from '../utils/formatJoiErrors';
import { AppResponse } from '../helpers/AppResponse';
import { reqConsumer } from '../helpers/reqConsumer';

const orderingSchema = Joi.object({
  orderBy: Joi.string(),
  direction: Joi.string().valid('ASC', 'DESC'),
})
  .unknown()
  .with('orderBy', 'direction')
  .with('direction', 'orderBy');

const useOrdering = async (req, res, next) => {
  try {
    // @ts-ignore
    await orderingSchema.validateAsync(req.query, {
      abortEarly: false,
    });

    const { orderBy = 'id', direction = 'ASC' } = req.query;

    res.locals.useOrdering = () => ({ order: [[orderBy, direction]] });

    res.locals.orderData = {
      orderBy,
      direction,
    };

    reqConsumer.useOdering = res.locals.useOrdering;
    reqConsumer.orderData = res.locals.orderData;

    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { orderingSchema, useOrdering };
