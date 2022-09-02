require('dotenv').config({ path: '.env' });
const express = require('express');
const path = require('path');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index.js');
const config = require('./lib/config');
const fs = require('fs');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const app = express();
let secretClient;

// setup static routes
require('./controllers/static')(app);

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
    fs.writeFileSync(path.join(__dirname, 'vapidKeys.json'), JSON.stringify(vapidKey));
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
