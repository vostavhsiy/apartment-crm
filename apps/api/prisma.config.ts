import { config } from "dotenv";
import path from "node:path";
import { defineConfig } from "prisma/config";

config();

export default defineConfig({
  schema: path.join("prisma"),
});
