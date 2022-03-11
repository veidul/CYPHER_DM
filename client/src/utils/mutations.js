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
  mutation addMessage($cypherId: String, $messageText: String!) {
    addMessage(cypherId: $cypherId, messageText: $messageText) {
      _id
      messages {
        messageText
        createdAt
        username
        cypherId
      }
      users {
        _id
        username
        email
      }
    }
  }
`;
// might need to change id references
export const ADD_CYPHER_USER = gql`
  mutation addCypherUser($_id: ID!) {
    addCypherUser(_id: $_id) {
      _id
      createdAt
      messages {
        createdAt
        messageText
        username
        cypherId
      }
      users {
        _id
        username
        email
      }
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
        username
        cypherId
      }
      users {
        _id
        username
        email
      }
    }
  }
`;
