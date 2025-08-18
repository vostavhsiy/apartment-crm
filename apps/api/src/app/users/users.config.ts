import { Prisma } from "@prisma/client";

export const UserIncludeConfig: Prisma.UserInclude = {
  notifications: {
    where: {
      isReaded: false,
    },
  },
};
