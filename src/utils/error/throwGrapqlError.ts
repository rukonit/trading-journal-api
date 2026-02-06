import { GraphQLError } from "graphql";

export function badRequest(message: string) {
  throw new GraphQLError(message, {
    extensions: { code: "BAD_REQUEST", http: { status: 400 } }
  });
}

export function unauthorized(message = "Unauthorized") {
  throw new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED", http: { status: 401 } }
  });
}

export function conflict(message: string) {
  throw new GraphQLError(message, {
    extensions: { code: "CONFLICT", http: { status: 409 } }
  });
}
