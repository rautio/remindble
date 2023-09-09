/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_collectionId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "collectionId";

-- DropTable
DROP TABLE "Collection";
