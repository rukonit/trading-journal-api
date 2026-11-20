import z from "zod";
import { CommodityType, EventType } from "../../../generated/prisma";

export const createTradeSchema = z.object({
  account: z.string().min(1, "Account name cannot be empty"),
  executedAt: z.date("Invalid date"),
  currency: z.string().min(1, "Currency cannot be empty"),
  type: z.number().int().nonnegative("Type must be a non-negative integer"),
  commodityType: z.enum(CommodityType, "Invalid commodity type"),
  eventType: z.enum(EventType, "Invalid event type"),
  quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  commission: z.number().nonnegative("Commission must be a non-negative number"),
  fee: z.number().nonnegative("Fee must be a non-negative number"),
  email: z.email("Invalid email address"),
  source: z.string().min(1, "Source cannot be empty"),
});

export type CreateTradeInput = z.infer<typeof createTradeSchema>;
