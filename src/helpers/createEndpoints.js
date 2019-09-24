/*
const handleRouter = [
  {
    method: 'post',
    endpoint: '/:productId/images',
    middlewares: [checkUserAuth],
    handler: ProductController.create,
  },
  {
    method: 'post',
    endpoint: '/:productId/images',
    middlewares: [checkUserAuth],
    handler: ProductController.create,
  },
];
*/
import express from 'express';

const Router = express.Router();

const createEndpoints = (routes) => {
  const existingRoutes = [];
  routes.map((router) => {
    if (existingRoutes.includes(router.endpoint)) {
      throw new Error('An endpoint has been repeated');
    }
    existingRoutes.push(router.endpoint);

    return Router[router.method](
      router.endpoint,
      router.middlewares,
      router.handler,
    );
  });
};

export default createEndpoints;
