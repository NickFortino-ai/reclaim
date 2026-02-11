-- CreateTable
CREATE TABLE "IntimacyCheckIn" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "confidence" INTEGER NOT NULL,
    "realAttraction" INTEGER NOT NULL,
    "emotionalConnection" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntimacyCheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IntimacyCheckIn_userId_idx" ON "IntimacyCheckIn"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "IntimacyCheckIn_userId_dayNumber_key" ON "IntimacyCheckIn"("userId", "dayNumber");

-- AddForeignKey
ALTER TABLE "IntimacyCheckIn" ADD CONSTRAINT "IntimacyCheckIn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
