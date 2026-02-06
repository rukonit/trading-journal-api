import z from "zod";

const createTradeSchema = z.object({
    account: z.string().min(1, "Account name cannot be empty"),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    currency: z.string().min(1, "Currency cannot be empty"),
    type: z.number().int().nonnegative("Type must be a non-negative integer"),
    side: z.enum(["B", "S", "SS", "BC"], "Side must be either 'B - Buy', 'S - Sell', 'SS - Sell Short', 'BC - Buy to Cover'"),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    price: z.number().nonnegative("Price must be a non-negative number"),
    grossProceeds: z.number().nonnegative("Gross Proceeds must be a non-negative number"),
    netProceeds: z.number().nonnegative("Net Proceeds must be a non-negative number"),
    email: z.string().email("Invalid email address"),
})

export type CreateTradeInput = z.infer<typeof createTradeSchema>;