-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasCompletedOnboarding" BOOLEAN NOT NULL DEFAULT false;

-- Set existing users to true so they skip onboarding
UPDATE "User" SET "hasCompletedOnboarding" = true;
