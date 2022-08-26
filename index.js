require('dotenv').config({ path: '.env' });
const express = require('express');
const path = require('path');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index.js');
const config = require('./lib/config');
const app = express();

// setup static routes
require('./controllers/static')(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.use(controllers);

const publicVapidKey = config.publicVapidKey;
const privateVapidKey = config.privateVapidKey;
webPush.setVapidDetails('mailto:dcartwright@ucdavis.edu', publicVapidKey, privateVapidKey);

app.listen(3000, () => {
  console.log('server ready on port 3000');
});
