import { z } from "zod";

export const profileSchema = z.object({
  name: z.string({ required_error: "Please enter a name" }),

  description: z.string({ required_error: "Please enter a description" }),
});

export type IProfileSchema = z.infer<typeof profileSchema>;
