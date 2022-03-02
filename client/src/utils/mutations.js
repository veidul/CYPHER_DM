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
  mutation addMessage($cypherId: String!, $messageText: String!, $messageAuthor: String!) {
    addMessage(cypherId: $cypherId, messageText: $messageText:, messageAuthor: $messageAuthor){
      _id
      message {
      messageText
      messageAuthor
      }
      }
    }
`;
// might need to change id references
export const ADD_CYPHER_USER = gql`
  mutation addCypherUser($userId: String!, $cypherId: String!) {
    addCypherUser(userId: $userId, cypherId: $cypherId)
    _id
    user {
      _id
    }
  }
`;

export const ADD_CYPHER = gql`
  mutation addCypher($userId: String!) {
    addCypher(userId: $userId)
    user {
      _id
    }
  }
`;
