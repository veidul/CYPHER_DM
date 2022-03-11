import { gql } from "@apollo/client";

export const CYPHER_ADDED = gql`
    subscription onCypherAdded {
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
    subscription onUserAdded {
        newCypherUser {
            userId
        }
    }
`