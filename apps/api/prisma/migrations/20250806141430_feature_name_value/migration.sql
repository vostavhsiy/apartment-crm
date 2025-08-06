/*
  Warnings:

  - You are about to drop the column `title` on the `features` table. All the data in the column will be lost.
  - Added the required column `name` to the `features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `features` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."features" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
