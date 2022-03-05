import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
export const GET_CYPHERS = gql`
  query cyphers {
    cyphers {
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
