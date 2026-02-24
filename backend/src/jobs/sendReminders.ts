import { prisma } from '../services/prisma.js';
import { sendPushNotification } from '../services/firebase.js';

export async function sendDailyReminders(): Promise<void> {
  try {
    // Find users who have a push token and reminder time set
    const users = await prisma.user.findMany({
      where: {
        pushToken: { not: null },
        reminderTime: { not: null },
        subscriptionStatus: { in: ['trialing', 'active', 'completed'] },
      },
      select: {
        id: true,
        pushToken: true,
        reminderTime: true,
        timezone: true,
        lastCheckIn: true,
      },
    });

    const now = new Date();
    let sent = 0;

    for (const user of users) {
      if (!user.pushToken || !user.reminderTime) continue;

      // Parse the user's preferred reminder time (HH:MM)
      const [reminderHours, reminderMinutes] = user.reminderTime.split(':').map(Number);

      // Get the current time in the user's timezone
      const userNow = new Date(now.toLocaleString('en-US', { timeZone: user.timezone || 'UTC' }));
      const userHour = userNow.getHours();
      const userMinute = userNow.getMinutes();

      // Check if we're within the 15-minute window of the user's reminder time
      const reminderTotalMinutes = reminderHours * 60 + reminderMinutes;
      const currentTotalMinutes = userHour * 60 + userMinute;
      const diff = currentTotalMinutes - reminderTotalMinutes;

      if (diff < 0 || diff >= 15) continue;

      // Check if user already checked in today (in their timezone)
      if (user.lastCheckIn) {
        const lastCheckInLocal = new Date(
          user.lastCheckIn.toLocaleString('en-US', { timeZone: user.timezone || 'UTC' })
        );
        if (
          lastCheckInLocal.getFullYear() === userNow.getFullYear() &&
          lastCheckInLocal.getMonth() === userNow.getMonth() &&
          lastCheckInLocal.getDate() === userNow.getDate()
        ) {
          continue; // Already checked in today
        }
      }

      const success = await sendPushNotification(
        user.pushToken,
        'Daily Check-In Reminder',
        "Time to check in and keep your streak going. You've got this.",
        { route: '/dashboard' }
      );

      if (success) {
        sent++;
      } else {
        // Token may be stale — clear it
        await prisma.user.update({
          where: { id: user.id },
          data: { pushToken: null, pushTokenPlatform: null },
        });
      }
    }

    if (sent > 0) {
      console.log(`Sent ${sent} daily reminder notifications`);
    }
  } catch (error) {
    console.error('Send daily reminders error:', error);
  }
}
