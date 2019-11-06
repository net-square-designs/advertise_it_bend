import bodyParser from 'body-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import expressip from 'express-ip';

// Helpers
import { setAppResponse, AppResponse } from './helpers/AppResponse';

// appRoutes
import appRoutes from './routes';

// middlewares
import { usePagination } from './middlewares/pagination';
import { configurePassport } from './middlewares/passport';
import { useOrdering } from './middlewares/ordering';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

configurePassport();

const bootstrapApp = async (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(limiter);
  app.use(setAppResponse);
  app.use(usePagination);
  app.use(useOrdering);
  app.use(expressip().getIpInfoMiddleware);
  app.enable('trust proxy');

  await app.use('/api/v1', appRoutes);
  app.use('/*', (req, res) => AppResponse.notFound(res, { message: 'This endpoint does not exist' }));

  return app;
};

export default bootstrapApp;
