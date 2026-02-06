import { ZodError } from "zod";
import { validateSchema } from "../../utils/validateSchema";
import { createUserSchema } from "./user.schema";
import { createUser, getUsers } from "./user.service";
import { AppError } from "../../utils/error/AppError";
import { handlePrismaError } from "../../utils/error/handlePrismaError";

export default {
  Query: {
    users: () => getUsers(),
  },
  Mutation: {
    createUser: async (_: unknown, args: unknown) => {
      return validateSchema(createUserSchema, args)
        .asyncAndThen((data) => createUser(data))
        .match(
          (user) => user,
          (error) => {
            if (error instanceof AppError) {
              throw error;
            }
            throw handlePrismaError(error);
          }
        );
    },
  },
};
