import { ApartmentCollection, CollectionClient } from "@prisma/client";

import { Collection } from "./collection";

export interface CollectionWithRelations extends Collection {
  apartmentsLinks: ApartmentCollection[];
  clientsLinks: CollectionClient[];
}
