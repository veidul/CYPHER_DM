import { gql } from "@apollo/client";

export const CYPHER_ADDED = gql`
    subscription newCypher {
        newCypher {
            _id
        }
    }
`


export const MESSAGE_ADDED = gql `
    subscription onMessageAdded {
        newMessage {
            _id
            messageText
        }
    }
`


export const NEW_CYPHER_USER = gql` 
    subscription newCypherUser {
        newCypherUser {
            userId
        }
    }
`