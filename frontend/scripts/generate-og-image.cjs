const sharp = require('sharp');
const path = require('path');

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#60a5fa"/>
      <stop offset="100%" style="stop-color:#3b82f6"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Shield icon (centered, scaled up) -->
  <g transform="translate(480, 80) scale(0.47)">
    <path d="M256 80 L400 140 L400 280 C400 360 340 420 256 450 C172 420 112 360 112 280 L112 140 Z"
          fill="none" stroke="url(#accent)" stroke-width="24" stroke-linejoin="round"/>
    <path d="M180 320 L256 180 L332 320"
          fill="none" stroke="#ffffff" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M200 320 L312 320"
          fill="none" stroke="#ffffff" stroke-width="28" stroke-linecap="round"/>
  </g>

  <!-- "RECLAIM" text -->
  <text x="600" y="420" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="white" letter-spacing="6">
    RECLAIM
  </text>

  <!-- Subtitle -->
  <text x="600" y="475" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#94a3b8" letter-spacing="4">
    365 DAYS TO FREEDOM
  </text>

  <!-- Bottom accent line -->
  <rect x="500" y="510" width="200" height="3" rx="1.5" fill="url(#accent)" opacity="0.6"/>

  <!-- Tagline -->
  <text x="600" y="560" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#64748b">
    A private accountability platform for men
  </text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'og-image.png'))
  .then(() => console.log('OG image generated: public/og-image.png'))
  .catch(err => console.error('Failed to generate OG image:', err));
