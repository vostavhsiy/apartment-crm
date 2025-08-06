/*
  Warnings:

  - You are about to drop the column `features` on the `apartments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."apartments" DROP COLUMN "features";

-- CreateTable
CREATE TABLE "public"."features" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ApartmentToFeature" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ApartmentToFeature_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ApartmentToFeature_B_index" ON "public"."_ApartmentToFeature"("B");

-- AddForeignKey
ALTER TABLE "public"."_ApartmentToFeature" ADD CONSTRAINT "_ApartmentToFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ApartmentToFeature" ADD CONSTRAINT "_ApartmentToFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
