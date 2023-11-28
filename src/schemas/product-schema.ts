import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  serial_number: z.string().min(1),
});

export type Inputs = z.infer<typeof productSchema>;
