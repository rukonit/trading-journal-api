import { err, fromPromise, ok, ResultAsync } from "neverthrow";
import prisma from "../../lib/prisma";
import { CreateUserInput } from "./user.schema";
import { AppError } from "../../utils/error/AppError";
import { Prisma, User } from "../../../generated/prisma";

type UserQuery = { select?: Prisma.UserSelect };

export const createUser = (
  data: CreateUserInput,
  query: UserQuery = {}
): ResultAsync<User, AppError> => {
  const { address, accounts, ...userData } = data;

  return fromPromise(
    prisma.user.create({
      ...query,
      data: {
        ...userData,
        accounts: accounts ?? undefined,
        address: address ? { create: address } : undefined,
      },
    }),
    (_error) => {
      return new AppError("Database error", 500);
    }
  ).andThen((user) => {
    if (!user) {
      return err(new AppError("User creation failed", 500));
    }

    return ok(user);
  });
};

export const getUsers = (query: UserQuery = {}) => {
  return prisma.user.findMany({ ...query });
};
