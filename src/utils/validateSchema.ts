import { z } from "zod";
import { Result, ok, err } from "neverthrow";
import { handleZodError } from "./error/formatZodError";
import { AppError } from "./error/AppError";

export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): Result<z.infer<T>, AppError> {
  const parsed = schema.safeParse(data);

  return parsed.success ? ok(parsed.data) : err(handleZodError(parsed.error));
}