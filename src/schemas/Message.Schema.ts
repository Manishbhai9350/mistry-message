import { z } from "zod";

export const messageSchem = z.object({
  content: z.
  string()
  .min(10 , 'message can not less than 10 characters ')
  .max(300 , 'messafe can not more than 300 characters')
});
