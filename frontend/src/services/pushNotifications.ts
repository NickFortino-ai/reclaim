import { PushNotifications } from '@capacitor/push-notifications';
import { isNative } from '../utils/platform';

export async function registerPushNotifications(
  onToken: (token: string) => void
): Promise<void> {
  if (!isNative()) return;

  const permission = await PushNotifications.requestPermissions();

  if (permission.receive !== 'granted') {
    console.log('Push notification permission denied');
    return;
  }

  await PushNotifications.register();

  PushNotifications.addListener('registration', (token) => {
    onToken(token.value);
  });

  PushNotifications.addListener('registrationError', (error) => {
    console.error('Push registration error:', error);
  });

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push notification received in foreground:', notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    // Handle deep linking from notification tap
    const route = action.notification.data?.route;
    if (route && typeof route === 'string') {
      window.location.href = route;
    }
  });
}
