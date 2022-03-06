import { gql } from "@apollo/client";

export const CYPHER_ADDED = gql`
    subscription onCypherAdded {
        newCypher {
            _id
        }
    }
`