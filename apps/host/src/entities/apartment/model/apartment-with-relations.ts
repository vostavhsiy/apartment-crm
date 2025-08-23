import { File } from "@prisma/client";

import { Apartment } from "./apartment";

export interface ApartmentWithRelations extends Apartment {
  files: File[];
}
