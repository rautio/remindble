/*
  Warnings:

  - Made the column `expiresAt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "expiresAt" SET NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 hour';
