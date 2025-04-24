import dotenv from 'dotenv';

dotenv.config();

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV,
  throttler: {
    ttl: process.env.THROTTLER_TTL,
    limit: process.env.THROTTLER_LIMIT,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize:
      process.env.NODE_ENV == 'PROD'
        ? false
        : process.env.DB_SYNCHRONIZE == 'ENABLED',
    logging: process.env.DB_LOGS !== 'DISABLED',
    migrationsRun: process.env.NODE_ENV !== 'PROD',
  },
});
