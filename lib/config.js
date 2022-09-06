import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const env = process.env;

let vapidKeys = {};
if( fs.existsSync(path.join(__dirname, '..', 'vapidKeys.json')) ) {
  vapidKeys = JSON.parse(fs.readFileSync(path.join(__dirname, '..',  'vapidKeys.json'), 'utf-8'));
}
if( env.PUBLIC_VAPID_KEY ) vapidKeys.publicKey = env.PUBLIC_VAPID_KEY;
if( env.PRIVATE_VAPID_KEY ) vapidKeys.privateKey = env.PRIVATE_VAPID_KEY;

const clientEnv = env.CLIENT_ENV || 'dev';

const serverConfig = {
  server : {
    port : env.PORT || 3000,
  },

  dataHost : env.DATA_HOST || 'https://data.casita.library.ucdavis.edu',

  image : {
    block : {x: 1666, y: 213 },
    products : ['hourly-max-10d-max.png', 'hourly-max-10d-min.png', 'hourly-max-10d-average.png',
                'hourly-max-10d-stddev.png', 'hourly-max.png']
  },

  client : {
    env : clientEnv,
    dir : clientEnv === 'prod' ? 'dist' : 'public',    
  },

  title : 'Casita Thermal Anomaly App',
  appRoutes : ['events', 'event', 'event-detail'],

  publicVapidKey : vapidKeys.publicKey,
  privateVapidKey : vapidKeys.privateKey
};

export default serverConfig;
