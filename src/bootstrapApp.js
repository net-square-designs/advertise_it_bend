import bodyParser from 'body-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

// Helpers
import { setAppResponse, AppResponse } from './helpers/AppResponse';

// appRoutes
import appRoutes from './routes';

// middlewares
import { usePagination } from './middlewares/pagination';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const bootstrapApp = async (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(limiter);
  app.use(setAppResponse);
  app.use(usePagination);

  await app.use('/api/v1', appRoutes);
  app.use('/*', (req, res) => AppResponse.notFound(res, { message: 'This endpoint does not exist' }));

  return app;
};

export default bootstrapApp;
