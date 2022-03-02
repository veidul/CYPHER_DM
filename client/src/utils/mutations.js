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
  mutation addMessage($_id: ID!, $messageText: String!, $messageAuthor: String!, $userId: ID!) {
    addMessage(_id: $_id, messageText: $messageText:, messageAuthor: $messageAuthor){
      _id
      message {
      messageText
      messageAuthor
      userId
      }
      }
    }
`;
// might need to change id references
export const ADD_CYPHER_USER = gql`
  mutation addCypherUser($userId: ID!, $_id: ID!) {
    addCypherUser(userId: $userId, _id: $_id)
    _id
    user {
      userId
    }
  }
`;

export const ADD_CYPHER = gql`
  mutation addCypher($userId: ID!) {
    addCypher(userId: $userId)
    user {
      userId
    }
  }
`;
