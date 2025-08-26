import { ApartmentClient, ClientApartmentView, Prisma } from "@prisma/client";

import { Client } from "./client";

export interface ClientWithRelations extends Client {
  likes: ApartmentClient[];
  apartmentViews: ClientApartmentView[];
  collectionsLinks: Array<
    Prisma.CollectionClientGetPayload<{
      include: { collection: { include: { apartmentsLinks: true } } };
    }>
  >;
}
