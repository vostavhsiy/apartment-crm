import { Prisma } from "@prisma/client";

export const ClientIncludeConfig: Prisma.ClientInclude = {
  collectionsLinks: {
    include: { collection: { include: { apartmentsLinks: true } } },
  },
  apartmentViews: true,
  likes: true,
};
