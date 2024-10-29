/*
  Warnings:

  - You are about to drop the `Agents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Channels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chatbots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conversations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lookup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Agents";

-- DropTable
DROP TABLE "Channels";

-- DropTable
DROP TABLE "Chatbots";

-- DropTable
DROP TABLE "Clients";

-- DropTable
DROP TABLE "Contacts";

-- DropTable
DROP TABLE "Conversations";

-- DropTable
DROP TABLE "Lookup";

-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "channels" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "orgnization_id" TEXT,
    "user_id" TEXT,
    "name" TEXT,
    "platform" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "chatbot_id" TEXT,
    "configuration" JSONB,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "orgnization_id" TEXT,
    "user_id" TEXT,
    "name" TEXT,
    "title" TEXT,
    "description" TEXT,
    "platform" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "chatbot_id" TEXT,
    "configuration" JSONB,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "tags" JSONB,
    "type" INTEGER,
    "role" TEXT,
    "industry" TEXT,
    "capabilities" JSONB,
    "business_information" JSONB,
    "faqs" JSONB,
    "products" JSONB,
    "documents" JSONB,
    "is_trained" BOOLEAN,
    "avatar" TEXT,
    "plain_text" TEXT,

    CONSTRAINT "chatbots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_by_id" TEXT,
    "created_by" TEXT,
    "orgnization_id" TEXT,
    "user_id" TEXT,
    "name" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "middle_name" TEXT,
    "emails" JSONB,
    "phones" JSONB,
    "avatar" TEXT,
    "source" JSONB,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "contact" JSONB,
    "channel" JSONB,
    "agent" JSONB,
    "needs_attention" BOOLEAN NOT NULL DEFAULT false,
    "attention_reason" TEXT,
    "last_message_timestamp" TIMESTAMPTZ,
    "last_user_message_timestamp" TIMESTAMPTZ,
    "unread_count" INTEGER NOT NULL DEFAULT 0,
    "tags" JSONB,
    "controlled_by" TEXT,
    "last_message_by" TEXT,
    "description" TEXT,
    "platform_thread_id" TEXT,
    "orgnization_id" TEXT,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lookups" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "icon" TEXT,
    "orgnization_id" TEXT,
    "type" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "lookups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orgnization_id" TEXT,
    "conversation_id" TEXT,
    "sender" TEXT,
    "agent" JSONB,
    "content" TEXT,
    "content_type" TEXT,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "attachments" JSONB,
    "platform_identifier" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgnizations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "orgnizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "avatar" TEXT,
    "orgnization_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
