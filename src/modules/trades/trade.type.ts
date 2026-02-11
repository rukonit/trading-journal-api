import { gql } from "apollo-server";

export default gql`
type Trade {
    id: Int!
    account: String!
    date: String!
    currency: String!
    type: Int!
    side: String!
    quantity: Int!
    price: Float!
    grossProceeds: Float!
    netProceeds: Float!
    email: String!
}

type Query {
    trades: [Trade!]!
    getTradesByUserAccountIdAndEmail(account: String!, email: String!): [Trade!]!
}

type Mutation {
    createTrade(
        account: String!
        date: String!
        currency: String!
        type: Int!
        side: String!
        quantity: Int!
        price: Float!
        grossProceeds: Float!
        netProceeds: Float!
        email: String!
    ): Trade!
}
`
