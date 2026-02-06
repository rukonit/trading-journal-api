import { gql } from "apollo-server";

export default gql`
type User {
    id: Int!
    name: String!
    email: String!
    password: String
    accounts: [String]
}

type Query {
    users: [User!]!
}
type Mutation {
    createUser(name: String!, email: String!, password: String, accounts: [String]): User!
}
`