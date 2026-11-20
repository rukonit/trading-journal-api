import { z } from "zod";

export const addressSchema = z.object({
  street1: z.string().min(1, "Street address cannot be empty"),
  street2: z.string().nullish(),
  city: z.string().min(1, "City cannot be empty"),
  zipCode: z.string().min(1, "ZIP/postal code cannot be empty"),
  country: z.string().min(1, "Country cannot be empty"),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long").nullish(),
  accounts: z
    .array(z.string().min(1, "Account name cannot be empty"))
    .nullish(),
  address: addressSchema.nullish(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
