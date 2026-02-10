-- AlterTable
ALTER TABLE "User" ADD COLUMN "highestStreak" INTEGER NOT NULL DEFAULT 0;

-- Backfill: set highestStreak to currentStreak for existing users
UPDATE "User" SET "highestStreak" = "currentStreak";
