import express from 'express';
const router = express.Router();

// based on https://pusher.com/tutorials/push-notifications-node-service-workers/ and https://web.dev/notifications/
router.post('/subscribe', async (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({
        title: 'UC Davis',
    });

    webPush.sendNotification(subscription, payload)
        .catch((e) => {
            res.status(500).json({
                error: true,
                message: e.message,
                stack: e.stack
            })
        })
        .then(function(success) {
            console.log('sent push successfully.');
    });
});

export default router;
