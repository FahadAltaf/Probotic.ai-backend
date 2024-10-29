/*
  Warnings:

  - The primary key for the `orgnizations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "orgnizations" DROP CONSTRAINT "orgnizations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "orgnizations_pkey" PRIMARY KEY ("id");
