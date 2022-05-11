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
});
