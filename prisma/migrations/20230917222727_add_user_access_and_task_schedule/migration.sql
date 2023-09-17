-- CreateEnum
CREATE TYPE "Access" AS ENUM ('WAITLIST', 'LA');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "repeat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "schedule" TEXT NOT NULL DEFAULT 'in 1 hour',
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "access" "Access" NOT NULL DEFAULT 'WAITLIST',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
