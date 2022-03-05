const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { createServer } = require("http");
const PORT = process.env.PORT || 3001;
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const app = express();

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({}, wsServer);

  const server = new ApolloServer({
    // schema,
    cors: {
      origin: "*",
      credentials: true,
    },
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        }
      }
    }],
    context: authMiddleware,
    subscriptions: {
      onConnect: (sub) => {
        console.log(sub)
        console.log("WS connected")
      }
    }
  });
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  await server.start();
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client")));
  } else {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/index.html"));
    });
  }
  httpServer.listen(PORT, () => {
    console.log(`GQL server running on http://localhost:${PORT}/graphql`)
    console.log(`WS server running on ws://localhost:${PORT}`)
  });

}
startApolloServer(typeDefs, resolvers);
