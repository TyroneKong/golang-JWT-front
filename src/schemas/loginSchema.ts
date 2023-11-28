import { z } from "zod";

export const schema = z.object({
  email: z.string().min(1, { message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter a password" }),
});

export type Inputs = z.infer<typeof schema>;
