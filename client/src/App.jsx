import React from "react";
import "./assets/css/App.css";
import "./assets/css/output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginForm from "./components/Login";
import Home from "./views/Home";
import About from "./views/About";
import Nav from "./components/Nav";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  uri: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Nav />
          <div className="dark:bg-gray-900 dark:text-gray-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginForm />} />
              <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
            </Routes>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
