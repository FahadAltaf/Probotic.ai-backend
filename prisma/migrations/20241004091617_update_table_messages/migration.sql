/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT,
    "conversation_id" TEXT,
    "sender" TEXT,
    "agent" JSONB,
    "content" TEXT,
    "content_type" TEXT,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "attachments" JSONB,
    "platform_identifier" TEXT,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
