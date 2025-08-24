const webpush = require('web-push');

function setupPush() {
  webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  return webpush;
}

async function sendPushNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    throw new Error(`Push notification error: ${error.message}`);
  }
}

module.exports = { setupPush, sendPushNotification };