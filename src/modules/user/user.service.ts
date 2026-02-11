import { err, fromPromise, ok, ResultAsync } from "neverthrow";
import prisma from "../../lib/prisma";
import { CreateUserInput } from "./user.schema";
import { AppError } from "../../utils/error/AppError";
import { User } from "../../../generated/prisma";

export const createUser = (
  data: CreateUserInput
): ResultAsync<User, AppError> => {
  return fromPromise(
    prisma.user.create({
      data: data,
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

export const getUsers = () => {
  return prisma.user.findMany();
};
