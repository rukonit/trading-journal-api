import { builder } from "../../graphql/builder";

export const UserType = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    password: t.exposeString("password", { nullable: true }),
    accounts: t.exposeStringList("accounts"),
  }),
});
