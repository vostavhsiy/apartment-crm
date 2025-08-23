import { Prisma } from "@prisma/client";
66
export const ApartmentIncludeConfig: Prisma.ApartmentInclude = {
  files: true,
  features: true
};
