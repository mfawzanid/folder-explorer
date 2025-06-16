-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('folder', 'file');

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "parent_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
