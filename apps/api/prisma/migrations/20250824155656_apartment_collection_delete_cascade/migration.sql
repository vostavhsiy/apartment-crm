-- DropForeignKey
ALTER TABLE "public"."apartment_collections" DROP CONSTRAINT "apartment_collections_apartmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."apartment_collections" DROP CONSTRAINT "apartment_collections_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."apartment_collections" ADD CONSTRAINT "apartment_collections_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."apartment_collections" ADD CONSTRAINT "apartment_collections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
