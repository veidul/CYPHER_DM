const { gql } = require("apollo-server-express");
// fix this
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Cypher {
    _id: ID
    createdAt: String
    messages: [Message]
    users: [User]
  }

  type Message {
    _id: ID
    createdAt: String
    messageText: String
    username: String
    cypherId: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  input UserInput {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Query {
    me: User
    cypher(_id: ID): Cypher
    cyphers: [Cypher]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addCypher(input: UserInput!): Cypher
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(cypherId: String, messageText: String): Cypher
    addCypherUser(_id: ID!): Cypher
  }

  type Subscription {
    newCypherUser(userId: Int): User
    newMessage(messageText: String, cypherId: ID): Cypher
    newCypher: Cypher
  }
`;

module.exports = typeDefs;
