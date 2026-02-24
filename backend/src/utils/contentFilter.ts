// Basic content filter for partner messages
// Blocks profanity, URLs, phone numbers, and email addresses

const BLOCKED_PATTERNS: RegExp[] = [
  // URLs (prevent link sharing)
  /https?:\/\/\S+/i,
  /www\.\S+/i,
  // Phone numbers
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
  // Email addresses
  /\b[\w.-]+@[\w.-]+\.\w{2,}\b/i,
];

export function isMessageAllowed(content: string): { allowed: boolean; reason?: string } {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(content)) {
      return { allowed: false, reason: 'Message contains prohibited content (links, phone numbers, or email addresses are not allowed)' };
    }
  }
  return { allowed: true };
}
