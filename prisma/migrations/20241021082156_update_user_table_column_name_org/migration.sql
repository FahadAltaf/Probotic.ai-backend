/*
  Warnings:

  - You are about to drop the column `orgnization_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "orgnization_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "channels_orgnization_id_user_id_idx" ON "channels"("orgnization_id", "user_id");

-- CreateIndex
CREATE INDEX "chatbots_orgnization_id_user_id_idx" ON "chatbots"("orgnization_id", "user_id");

-- CreateIndex
CREATE INDEX "contacts_orgnization_id_user_id_idx" ON "contacts"("orgnization_id", "user_id");

-- CreateIndex
CREATE INDEX "messages_orgnization_id_conversation_id_idx" ON "messages"("orgnization_id", "conversation_id");

-- CreateIndex
CREATE INDEX "orgnizations_id_idx" ON "orgnizations"("id");

-- CreateIndex
CREATE INDEX "users_organization_id_id_idx" ON "users"("organization_id", "id");
