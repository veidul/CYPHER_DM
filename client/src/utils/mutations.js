import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($_id: ID!, $messageText: String!, $input: UserInput!) {
    addMessage(input: $input, messageText: $messageText) {
      _id
      message {
        messageText
        createdAt
        user {
          _id
          username
          email
          password
        }
      }
    }
  }
`;
// might need to change id references
export const ADD_CYPHER_USER = gql`
  mutation addCypherUser($input: UserInput!) {
    addCypherUser(input: $input) {
      _id
      createdAt
      users
      messages
    }
  }
`;

export const ADD_CYPHER = gql`
  mutation addCypher($input: UserInput!) {
    addCypher(input: $input) {
      _id
      createdAt
      messages {
        createdAt
        messageText
        user {
          username
        }
      }
      users {
        _id
        username
        email
      }
    }
  }
`;
