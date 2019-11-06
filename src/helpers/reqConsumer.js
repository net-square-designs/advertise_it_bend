/**
 * @typedef {{
 *  usePagination?: () => {
 *  offset: number,
 *  limit: number
 * },
 *  useOdering?: () => {
 *    order: string[][]
 *  },
 *  paginationData?: {
 *    page: number,
 *    pageSize: number,
 *  },
 *  orderData?: {
 *    orderBy: string,
 *    direction: string,
 *  },
 * }} ReqConsumer
 */

/**
 * @type {ReqConsumer}
 */
const reqConsumer = {};

export { reqConsumer };

// const a = reqConsumer.useOdering().order[0][0];
