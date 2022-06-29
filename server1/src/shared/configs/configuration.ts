/**
 * Regroup all the configuration variable of the app
 */
export default () => ({
  application: {
    rateLimit: {
      ttl: parseInt(process.env.TTL_LIMIT, 10) || 100,
      limit: parseInt(process.env.RATE_LIMIT, 10) || 50,
    },
  },
  auth: {
    bearerToken: {
      secret: 'test',
      expiresIn: '1h',
    },
    refreshToken: {
      expiresIn: '24h',
    },
  },
  mongodb: {
    uri:
      process.env.MONGODB_URI ||
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`,
    connectionName: process.env.MONGODB_CONNECTION || 'justalk',
  },
});
