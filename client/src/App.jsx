import React, { useEffect } from "react";
import io from "socket.io-client";
import "./assets/css/App.css";
import "./assets/css/output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from "@apollo/client/link/context";
import Register from "./components/register";
import LoginForm from "./components/Login";
import Home from "./views/Home";
import About from "./views/About";
import Nav from "./components/Nav";
import Cypher from "./components/Cypher";

const socketURL = io("http://localhost:3001");

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const wsLink = new GraphQLWsLink(createClient({
  url:  process.env.NODE_ENV === "production" ? 'ws://something.herokuapp.com' : 'ws://localhost:3001/graphql'
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("id_token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

function App() {
  useEffect(() => {
    const socket = socketURL.connect();
  }, [])

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Nav />
          <div className="dark:bg-gray-900 dark:text-gray-300">/
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
              <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
            </Routes>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
