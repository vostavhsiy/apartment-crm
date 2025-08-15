import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const settings = envSchema.parse(process.env);
