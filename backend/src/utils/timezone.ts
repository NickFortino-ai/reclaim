import { Request } from 'express';

function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the user's timezone. Priority:
 * 1. X-Timezone request header (current device)
 * 2. Stored user.timezone from DB
 * 3. "UTC" fallback
 */
export function getUserTimezone(req: Request, userTimezone?: string | null): string {
  const headerTz = req.headers['x-timezone'] as string | undefined;
  if (headerTz && isValidTimezone(headerTz)) {
    return headerTz;
  }
  if (userTimezone && isValidTimezone(userTimezone)) {
    return userTimezone;
  }
  return 'UTC';
}

export function getTimezoneFromHeader(req: Request): string {
  const headerTz = req.headers['x-timezone'] as string | undefined;
  if (headerTz && isValidTimezone(headerTz)) {
    return headerTz;
  }
  return 'UTC';
}

export { isValidTimezone };
