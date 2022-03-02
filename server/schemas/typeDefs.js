const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    userId: ID
    username: String
    email: String
    password: String
  }

  type Cypher {
    _id: ID
    createdAt: String
    messages: [Message]!
    Users: [User]!
  }

  type Message {
    _id: ID
    createdAt: String
    messageText: String
    messageAuthor: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    cyphers: [Cypher]!
    cyphers(_id: ID): Cypher
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addCypher: Cypher
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(
      cypherId: String!
      messageText: String!
      messageAuthor: String!
    ): Cypher
    addCypherUser(userId: String!, _id: String!): Cypher
  }
`;
module.exports = typeDefs;
