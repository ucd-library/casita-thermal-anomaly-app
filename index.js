require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
// const cors = require('cors');
const path = require('path');
const webPush = require('web-push');
const bodyParser = require('body-parser');
// const https = require('https');
const fs = require('fs');

var options = {
  key: fs.readFileSync(path.join(__dirname, 'client-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'client-cert.pem'))
};

// setup static routes
require('./static')(app);

// cors
// const whitelist = ['https://data.casita.library.ucdavis.edu'];
// const corsOptions = {
//   credentials: false,
//   origin: false
// }
// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webPush.setVapidDetails('mailto:dcartwright@ucdavis.edu', publicVapidKey, privateVapidKey);

// based on https://pusher.com/tutorials/push-notifications-node-service-workers/
// also check https://developer.chrome.com/docs/workbox/service-worker-overview/ and https://web.dev/notifications/
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log(JSON.stringify(subscription))
    res.status(201).json({});
    const payload = JSON.stringify({
        title: 'UC Davis',
    });
    webPush.sendNotification(subscription, payload)
      .catch((err) => {
        console.log(err);
        res.json({ message: 'an error occurred' });
      })
      .then(function(success) {
          // res.json({ message: 'sent a push...' });
          console.log('sent push successfully.');
          console.log(success);
    });
});

app.listen(3333, () => {
  console.log('server ready on port 3333');
});

// https.createServer(options, app).listen(443, () => {
//   console.log('server is ready on port 443');
// });
