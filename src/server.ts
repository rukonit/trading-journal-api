import express from "express";
import { ApolloServer } from "@apollo/server";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { expressMiddleware } from "@as-integrations/express4";
import { AppError } from "./utils/error/AppError";
import { GraphQLError } from "graphql/error";

const app = express();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (_, error) => {
    console.log("GraphQL Error:", error);

    if (error instanceof Error && 'originalError' in error) {
      const originalError = error.originalError;

      if (originalError instanceof AppError) {
        return new GraphQLError(originalError.message, {
          extensions: {
            code: originalError.statusCode.toString(),
            http: {
              status: originalError.statusCode,
            },
          },
        });
      }
    }

    return new GraphQLError("Internal server error", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
        http: {
          status: 500,
        },
      },
    });
  },
});

export async function startServer() {
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
}
