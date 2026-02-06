import { ZodError } from "zod";
import { AppError } from "./AppError";

export function handleZodError(error: ZodError): AppError {
    const messages = error.issues.map((issue) => issue.message).join(", ");
    return new AppError(messages, 400)
} 
