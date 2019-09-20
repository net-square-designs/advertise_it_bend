import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import formatErrors from './utils/formatErrors';

import response from './utils/responses';
import router from './routes';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const bootstrapApp = async (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(expressValidator(formatErrors()));
  app.use(limiter);

  await app.use('/api/v1', router);
  app.use('/*', (req, res) => response.notFound(res, { message: 'This endpoint does not exist' }));

  // await app.listen(port, () => {
  //   console.log(`connected on port ${port}`);
  // });
  return app;
};

export default bootstrapApp;
