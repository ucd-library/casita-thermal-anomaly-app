import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import webPush from 'web-push';
import bodyParser from 'body-parser';
import controllers from './controllers/index.js';
import staticController from './controllers/static.js';
import config from './lib/config.js';
import fs from 'fs';
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config({ path: '.env' });

// setup static routes
// app.use(staticController);
staticController(app);

let secretClient;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.use(controllers);

async function loadLatestSecret(name) {
  if( !secretClient ) {
    secretClient = new SecretManagerServiceClient();
  }

  let resp = await secretClient.accessSecretVersion({
    name: `projects/digital-ucdavis-edu/secrets/${name}/versions/latest`
  });
  return resp[0].payload.data.toString('utf-8');
}

async function setupWebpush() {
  if( !config.publicVapidKey ) {
    let vapidKey = JSON.parse(await loadLatestSecret('thermal-anomaly-app-vapid-key'));
    fs.writeFileSync(path.join(__dirname, 'vapidKeys.json'), vapidKey);
    config.publicVapidKey = vapidKey.publicKey;
    config.privateVapidKey = vapidKey.privateKey;
  }

  const publicVapidKey = config.publicVapidKey;
  const privateVapidKey = config.privateVapidKey;
  webPush.setVapidDetails('mailto:dcartwright@ucdavis.edu', publicVapidKey, privateVapidKey);
}

app.listen(config.server.port, async () => {
  setupWebpush();
  console.log('server ready on port '+config.server.port);
});
