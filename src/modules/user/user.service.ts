import { err, fromPromise, ok, ResultAsync } from "neverthrow";
import prisma from "../../lib/prisma";
import { CreateUserInput } from "./user.schema";
import { AppError } from "../../utils/error/AppError";

export const createUser =  (data: CreateUserInput): ResultAsync<CreateUserInput, AppError> => {
    return fromPromise(
        prisma.user.create({
        data: data
    }), (error) => {
        return new AppError('Database error', 500);
    }).andThen((user) => {
        if (!user) {
            return err(new AppError("User creation failed", 500));
        }

        return ok(user);
    });
}

export const getUsers = () => {
    return prisma.user.findMany();
}