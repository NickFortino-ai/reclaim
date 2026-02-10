const { execSync, spawn } = require('child_process');

// Step 1: Baseline the existing database on first run.
// This marks the 0_init migration as "already applied" so Prisma
// won't try to re-create tables that already exist.
// On subsequent runs, this fails silently (already baselined).
try {
  execSync('npx prisma migrate resolve --applied "0_init"', { stdio: 'inherit' });
  console.log('[start] Baseline migration resolved.');
} catch {
  console.log('[start] Baseline already applied, continuing.');
}

// Step 2: Apply any pending migrations.
// This is safe — it only runs migrations that haven't been applied yet.
try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('[start] Migrations applied successfully.');
} catch (error) {
  console.error('[start] Migration failed:', error.message);
  process.exit(1);
}

// Step 3: Start the server.
const server = spawn('node', ['dist/index.js'], { stdio: 'inherit' });
server.on('exit', (code) => process.exit(code ?? 1));
