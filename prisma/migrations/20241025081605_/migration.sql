/*
  Warnings:

  - You are about to drop the column `deleted` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the `lookups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "channels_orgnization_id_user_id_idx";

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "deleted",
DROP COLUMN "platform",
DROP COLUMN "published",
DROP COLUMN "user_id",
ADD COLUMN     "platform_id" TEXT,
ADD COLUMN     "platform_name" TEXT;

-- DropTable
DROP TABLE "lookups";

-- CreateTable
CREATE TABLE "channel_owners" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "channel_id" TEXT,
    "user_id" TEXT,
    "orgnization_id" TEXT,

    CONSTRAINT "channel_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_platform" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "messaging_platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "channel_owners_orgnization_id_user_id_idx" ON "channel_owners"("orgnization_id", "user_id");

-- CreateIndex
CREATE INDEX "channels_orgnization_id_platform_id_chatbot_id_id_idx" ON "channels"("orgnization_id", "platform_id", "chatbot_id", "id");
