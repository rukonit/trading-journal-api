import { builder } from "../../graphql/builder";

export const AddressInput = builder.inputType("AddressInput", {
  fields: (t) => ({
    street1: t.string({ required: true }),
    street2: t.string(),
    city: t.string({ required: true }),
    zipCode: t.string({ required: true }),
    country: t.string({ required: true }),
  }),
});

export const UserType = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    password: t.exposeString("password", { nullable: true }),
    accounts: t.exposeStringList("accounts"),
    address: t.relation("address", { nullable: true }),
  }),
});

export const AddressType = builder.prismaObject("Address", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    street1: t.exposeString("street1"),
    street2: t.exposeString("street2", { nullable: true }),
    city: t.exposeString("city"),
    zipCode: t.exposeString("zipCode"),
    country: t.exposeString("country"),
  }),
});
