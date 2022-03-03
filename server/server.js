const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const PORT = process.env.PORT || 3001;

const app = express();
async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    cors: {
      origin: "*",
      credentials: true,
    },
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client")));
  }

  app.get("*", (req, res) => {
    console.log("line 30 route is hit");
    res.sendFile(path.join(__dirname, "../client/index.html"));
  });
  await new Promise((res) => httpServer.listen(PORT, res));
  console.log(
    `Graphql is ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(`Server ready at http://localhost:${PORT}`);
}
startApolloServer(typeDefs, resolvers);
