import { builder } from "../../graphql/builder";
import { validateSchema } from "../../utils/validateSchema";
import { createUserSchema } from "./user.schema";
import { createUser, getUsers } from "./user.service";
import { AppError } from "../../utils/error/AppError";
import { handlePrismaError } from "../../utils/error/handlePrismaError";
import { AddressInput } from "./user.type";

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (query) => getUsers(query),
  })
);

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      password: t.arg.string(),
      accounts: t.arg.stringList(),
      address: t.arg({ type: AddressInput }),
    },
    resolve: (query, _root, args) =>
      validateSchema(createUserSchema, args)
        .asyncAndThen((data) => createUser(data, query))
        .match(
          (user) => user,
          (error) => {
            if (error instanceof AppError) {
              throw error;
            }
            throw handlePrismaError(error);
          }
        ),
  })
);
