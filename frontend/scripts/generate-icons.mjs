import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const svgContent = readFileSync(join(iconsDir, 'icon.svg'));

async function generateIcons() {
  console.log('Generating PWA icons...');

  for (const size of sizes) {
    const outputPath = join(iconsDir, `icon-${size}.png`);

    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`  Created: icon-${size}.png`);
  }

  // Also create apple-touch-icon
  await sharp(svgContent)
    .resize(180, 180)
    .png()
    .toFile(join(iconsDir, 'apple-touch-icon.png'));
  console.log('  Created: apple-touch-icon.png');

  // Create favicon
  await sharp(svgContent)
    .resize(32, 32)
    .png()
    .toFile(join(__dirname, '../public/favicon.png'));
  console.log('  Created: favicon.png');

  console.log('Done!');
}

generateIcons().catch(console.error);
