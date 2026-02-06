import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long").nullable(),
  accounts: z
    .array(
      z.string().min(1, "Account name cannot be empty")
    )
    .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
