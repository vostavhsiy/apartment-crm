/*
  Warnings:

  - You are about to drop the column `address` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `clients` table. All the data in the column will be lost.
  - Made the column `phone` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."clients_email_key";

-- AlterTable
ALTER TABLE "public"."clients" DROP COLUMN "address",
DROP COLUMN "email",
ALTER COLUMN "phone" SET NOT NULL;
