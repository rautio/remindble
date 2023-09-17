-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 hour';
