import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import { AppError } from "./AppError";


export function handlePrismaError(error: unknown): AppError {
  if (error instanceof PrismaClientKnownRequestError) {
    return error.code === "P2002"
      ? new AppError("Resource already exists", 400)
      : new AppError("Prisma error occurred", 500);
  }

  return new AppError("Database error", 500);
}
