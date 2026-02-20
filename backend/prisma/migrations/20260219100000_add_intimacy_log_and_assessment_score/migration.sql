-- CreateTable
CREATE TABLE "IntimacyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "erectionQuality" INTEGER NOT NULL,
    "stayingPower" TEXT NOT NULL,
    "presence" INTEGER NOT NULL,
    "enjoyment" INTEGER NOT NULL,
    "connection" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntimacyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "milestone" TEXT NOT NULL,

    CONSTRAINT "AssessmentScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IntimacyLog_userId_date_idx" ON "IntimacyLog"("userId", "date");

-- CreateIndex
CREATE INDEX "AssessmentScore_userId_takenAt_idx" ON "AssessmentScore"("userId", "takenAt");

-- AddForeignKey
ALTER TABLE "IntimacyLog" ADD CONSTRAINT "IntimacyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentScore" ADD CONSTRAINT "AssessmentScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
