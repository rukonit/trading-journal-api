import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { GraphQLError, Kind } from "graphql";
import type PrismaTypes from "../../generated/pothos-types";
import { getDatamodel } from "../../generated/pothos-types";
import prisma from "../lib/prisma";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {};
  DefaultFieldNullability: false;
  Scalars: {
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [PrismaPlugin],
  defaultFieldNullability: false,
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});

const parseDate = (value: unknown): Date => {
  const date = new Date(value as string);
  if (typeof value !== "string" || isNaN(date.getTime())) {
    throw new GraphQLError("DateTime must be a valid ISO-8601 date string");
  }
  return date;
};

builder.scalarType("DateTime", {
  serialize: (value) => value.toISOString(),
  parseValue: parseDate,
  parseLiteral: (ast) =>
    parseDate(ast.kind === Kind.STRING ? ast.value : undefined),
});

builder.queryType({});
builder.mutationType({});
