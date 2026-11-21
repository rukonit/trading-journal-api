import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { randomUUID } from "node:crypto";
import { graphql } from "graphql";
import type { GraphQLSchema } from "graphql";
import type { PrismaClient } from "../generated/prisma";

let prisma: PrismaClient;
let schema: GraphQLSchema;

before(async () => {
  const testDatabaseUrl = process.env.TEST_DATABASE_URL;
  if (!testDatabaseUrl) {
    throw new Error(
      "Set TEST_DATABASE_URL to a migrated test database before running tests."
    );
  }

  process.env.DATABASE_URL = testDatabaseUrl;

  const [{ default: prismaClient }, { schema: graphqlSchema }] =
    await Promise.all([
      import("../src/lib/prisma"),
      import("../src/graphql/schema"),
    ]);

  prisma = prismaClient;
  schema = graphqlSchema;
});

after(async () => {
  await prisma?.$disconnect();
});

test("a user can have multiple related trades", async () => {
  const email = `user-trade-${randomUUID()}@example.test`;
  const firstAccount = `account-${randomUUID()}`;
  const secondAccount = `account-${randomUUID()}`;

  try {
    const createUserResult = await graphql({
      schema,
      contextValue: {},
      source: `
        mutation CreateUser($email: String!) {
          createUser(name: "Trade Test User", email: $email) {
            email
          }
        }
      `,
      variableValues: { email },
    });

    assert.ifError(createUserResult.errors?.[0]);
    const createdUser = createUserResult.data?.createUser as
      | { email: string }
      | undefined;
    assert.equal(createdUser?.email, email);

    const createTradesResult = await graphql({
      schema,
      contextValue: {},
      source: `
        mutation CreateTrades(
          $email: String!
          $firstDate: DateTime!
          $secondDate: DateTime!
        ) {
          first: createTrade(
            account: "${firstAccount}"
            executedAt: $firstDate
            currency: "USD"
            type: 1
            commodityType: EQUITY
            eventType: BUY
            quantity: 1
            price: 10
            commission: 0
            fee: 0
            email: $email
            source: "test"
          ) {
            user { email }
          }
          second: createTrade(
            account: "${secondAccount}"
            executedAt: $secondDate
            currency: "USD"
            type: 1
            commodityType: EQUITY
            eventType: BUY
            quantity: 2
            price: 20
            commission: 0
            fee: 0
            email: $email
            source: "test"
          ) {
            user { email }
          }
        }
      `,
      variableValues: {
        email,
        firstDate: "2026-01-01T12:00:00.000Z",
        secondDate: "2026-01-02T12:00:00.000Z",
      },
    });

    assert.ifError(createTradesResult.errors?.[0]);
    const createdTrades = createTradesResult.data as
      | {
          first: { user: { email: string } };
          second: { user: { email: string } };
        }
      | null;
    assert.equal(createdTrades?.first.user.email, email);
    assert.equal(createdTrades?.second.user.email, email);

    const usersResult = await graphql({
      schema,
      contextValue: {},
      source: `
        query {
          users {
            email
            trades {
              account
              user { email }
            }
          }
        }
      `,
    });

    assert.ifError(usersResult.errors?.[0]);
    const users = usersResult.data?.users as
      | Array<{
          email: string;
          trades: Array<{ account: string; user: { email: string } }>;
        }>
      | undefined;
    const user = users?.find((candidate) => candidate.email === email);

    assert.ok(user, "created user should be returned by the users query");
    assert.deepEqual(
      user.trades.map((trade) => trade.account).sort(),
      [firstAccount, secondAccount].sort()
    );
    assert.ok(user.trades.every((trade) => trade.user.email === email));
  } finally {
    await prisma.trade.deleteMany({ where: { email } });
    await prisma.user.deleteMany({ where: { email } });
  }
});
