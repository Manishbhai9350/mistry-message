import { z } from "zod";

export const verifySchema = z.object({
  code: z.string().length(6, "code legth must be 6 digits"),
});
