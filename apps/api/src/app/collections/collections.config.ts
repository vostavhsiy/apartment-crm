import { Prisma } from "@prisma/client";

export const CollectionIncludeConfig: Prisma.CollectionInclude = {
  apartmentsLinks: true,
  clientsLinks: true,
  user: true,
};
