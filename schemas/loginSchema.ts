import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, { message: "Please enter a username" }),
  password: z.string().min(1, { message: "Please enter a password" }),
});

export type Inputs = z.infer<typeof schema>;
