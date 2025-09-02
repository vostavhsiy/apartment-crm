import {
  ApartmentClient,
  ApartmentCollection,
  ClientApartmentView,
  Feature,
  File,
} from "@prisma/client";

import { Apartment } from "./apartment";

export interface ApartmentWithRelations extends Apartment {
  files: File[];
  features: Feature[];
  collectionsLinks: ApartmentCollection[];
  clientViews: ClientApartmentView[];
  clientsLikes: ApartmentClient[];
}
