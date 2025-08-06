/*
  Warnings:

  - You are about to drop the `_ApartmentToFeature` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apartmentId` to the `features` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_ApartmentToFeature" DROP CONSTRAINT "_ApartmentToFeature_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ApartmentToFeature" DROP CONSTRAINT "_ApartmentToFeature_B_fkey";

-- AlterTable
ALTER TABLE "public"."features" ADD COLUMN     "apartmentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_ApartmentToFeature";

-- AddForeignKey
ALTER TABLE "public"."features" ADD CONSTRAINT "features_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
