import admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT not set — push notifications disabled');
}

export async function sendPushNotification(
  token: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<boolean> {
  if (!serviceAccount) return false;

  try {
    await admin.messaging().send({
      token,
      notification: { title, body },
      data,
      apns: {
        payload: {
          aps: {
            badge: 1,
            sound: 'default',
          },
        },
      },
    });
    return true;
  } catch (error: unknown) {
    const fbError = error as { code?: string };
    if (fbError.code === 'messaging/registration-token-not-registered') {
      // Token is stale — caller should clean it up
      return false;
    }
    console.error('Push notification error:', error);
    return false;
  }
}
