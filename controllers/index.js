import express from 'express';
import webPush from './web-push.js';

const router = express.Router();

router.use('/web-push', webPush);

export default router;
