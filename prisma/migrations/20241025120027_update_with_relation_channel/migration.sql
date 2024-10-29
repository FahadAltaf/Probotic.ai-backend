/*
  Warnings:

  - The primary key for the `messaging_platform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `messaging_platform` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `channel_id` to the `channel_owners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_id` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channel_owners" DROP COLUMN "channel_id",
ADD COLUMN     "channel_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "platform_id",
ADD COLUMN     "platform_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "messaging_platform" DROP CONSTRAINT "messaging_platform_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "messaging_platform_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "channels_orgnization_id_platform_id_chatbot_id_id_idx" ON "channels"("orgnization_id", "platform_id", "chatbot_id", "id");

-- AddForeignKey
ALTER TABLE "channel_owners" ADD CONSTRAINT "channel_owners_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_owners" ADD CONSTRAINT "channel_owners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "messaging_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
