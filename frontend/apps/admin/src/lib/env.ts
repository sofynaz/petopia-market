import zod from "zod";

const envSchema = zod.object({
  VITE_API_URL: zod.string(),
});

export const env = envSchema.parse(import.meta.env);
