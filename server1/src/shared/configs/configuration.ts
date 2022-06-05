/**
 * Regroup all the configuration variable of the app
 */
export default () => ({
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
