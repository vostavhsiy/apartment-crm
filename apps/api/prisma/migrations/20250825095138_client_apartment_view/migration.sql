-- CreateTable
CREATE TABLE "public"."client_apartment_views" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_apartment_views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_apartment_views_clientId_apartmentId_key" ON "public"."client_apartment_views"("clientId", "apartmentId");

-- AddForeignKey
ALTER TABLE "public"."client_apartment_views" ADD CONSTRAINT "client_apartment_views_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client_apartment_views" ADD CONSTRAINT "client_apartment_views_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
