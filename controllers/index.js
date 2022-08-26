const express = require('express');
const webPush = require('./web-push.js');

const router = express.Router();

router.use('/web-push', webPush);

module.exports = router;