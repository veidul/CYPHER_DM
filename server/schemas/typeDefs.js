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
    messageId: ID
    createdAt: String
    messageText: String
    messageAuthor: String
    userId: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    cyphers(_id: ID): Cypher
  }

  
  type Mutation {
    login(email: String!, password: String!): Auth
    addCypher: Cypher
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(
      _id: ID!
      messageText: String!
      messageAuthor: String!
      userId: ID!
      ): Cypher
      addCypherUser(userId: ID!, _id: ID!): Cypher
    }

    type Subscription {
      newCypherUser(userId: Int): User
      newMessage(messageId: Int): Message
      newCypher(cypherId: Int): Cypher  
    }
`;
module.exports = typeDefs;
