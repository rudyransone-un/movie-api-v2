import { z } from "zod/v4";

export const MovieCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  poster_url: z.string(),
  year: z.string(),
  rating: z.float32(),
  kp_id: z.string(),
});

export type MovieCreateType = z.infer<typeof MovieCreateSchema>;