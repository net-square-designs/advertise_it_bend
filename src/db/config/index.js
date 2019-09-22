const dotenv = require('dotenv');

dotenv.config();

const logQueries = process.env.NODE_ENV === 'production' && {
  logging: false,
};

module.exports = {
  development: {
    use_env_variable: 'DEV_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  test: {
    use_env_variable: 'TEST_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  production: {
    use_env_variable: 'PROD_DB_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  local: {
    username: process.env.LOCAL_DB_USERNAME,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    host: process.env.LOCAL_DB_HOSTNAME,
    dialect: 'postgres',
    ...logQueries,
  },
};
