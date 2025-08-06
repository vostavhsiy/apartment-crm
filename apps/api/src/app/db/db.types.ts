import { PrismaClient } from "@prisma/client";
import * as runtime from "@prisma/client/runtime/library.js";

export type TransactionContext = Omit<PrismaClient, runtime.ITXClientDenyList>;
