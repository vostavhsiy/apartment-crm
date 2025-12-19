import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

export const dbServiceMock = mockDeep<PrismaClient>();

dbServiceMock.$transaction.mockImplementation(async (callback: any) => {
  return callback(dbServiceMock);
});
