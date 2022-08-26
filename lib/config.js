const env = process.env;

const clientEnv = env.CLIENT_ENV || 'dev';
const serverConfig = {
  server : {
    port : env.PORT || 3000,
  },

  client : {
    env : clientEnv,
    dir : clientEnv === 'prod' ? 'dist' : 'public',    
  },

  title : 'Casita Thermal Anomaly App',
  appRoutes : ['events', 'event-detail'],

  publicVapidKey : process.env.PUBLIC_VAPID_KEY,
  privateVapidKey : process.env.PRIVATE_VAPID_KEY,
};

module.exports = serverConfig;
