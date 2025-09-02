import { Prisma } from "@prisma/client";

export const ApartmentIncludeConfig: Prisma.ApartmentInclude = {
  files: true,
  features: true,
  collectionsLinks: {
    orderBy: {
      order: "asc",
    },
  },
  clientViews: true,
  clientsLikes: true,
};
