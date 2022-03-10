import React, { useEffect } from "react";
import "./assets/css/App.css";
import "./assets/css/output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import Register from "./components/register";
import LoginForm from "./components/Login";
import Home from "./views/Home";
import About from "./views/About";
import Nav from "./components/Nav";
import Auth from "./utils/auth";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === "production"
        ? "ws://something.herokuapp.com"
        : "ws://localhost:3001/subscriptions",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
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
  // link: httpLink,
  cache: new InMemoryCache(),
});

//basic functional component that returns an element passed via props if auth
//this component wraps our views and returns them based on auth in the routs section below
function RequireAuth({ children }) {
  return Auth.loggedIn() ? children : window.location.assign("/login");
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Nav />
          <div className="bg-gray-900 text-gray-300 h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    {" "}
                    <Home />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="/about"
                element={
                  <RequireAuth>
                    {" "}
                    <About />{" "}
                  </RequireAuth>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                render={() => <h1 className="display-2">Wrong page!</h1>}
              />
            </Routes>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
