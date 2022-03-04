import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      userId
      username
      email
    }
  }
`;
export const GET_CYPHERS = gql`
  query cyphers($_id: String) {
    cyphers(_id: $_id) {
      _id
      createdAt
      messages
      Users
    }
  }
`;
