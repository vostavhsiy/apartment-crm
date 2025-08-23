import { Apartment } from "@/entities/apartment/model/apartment";

import { Client } from "./client";

export interface ClientWithRelations extends Client {
  apartments: Apartment[];
}
