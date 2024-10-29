-- CreateTable
CREATE TABLE "Agents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "avatar" TEXT,
    "client_id" TEXT,

    CONSTRAINT "Agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channels" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT,
    "name" TEXT,
    "platform" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "chatbot_id" TEXT,
    "configuration" JSONB,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chatbots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "client_id" TEXT,
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

    CONSTRAINT "Chatbots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "name" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "middle_name" TEXT,
    "emails" JSONB,
    "phones" JSONB,
    "avatar" TEXT,
    "source" JSONB,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversations" (
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
    "client_id" TEXT,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lookup" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "icon" TEXT,
    "type" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "Lookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
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

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
