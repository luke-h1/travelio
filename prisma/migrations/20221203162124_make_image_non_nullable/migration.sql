/*
  Warnings:

  - Made the column `image` on table `holidays` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "holidays" ALTER COLUMN "image" SET NOT NULL;
