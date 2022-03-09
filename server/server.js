// const express = require("express");
// const path = require("path");
// const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { typeDefs, resolvers } = require("./schemas");
// const { authMiddleware } = require("./utils/auth");
// const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { createServer } = require("http");
// const PORT = process.env.PORT || 3001;
// const { WebSocketServer } = require('ws');
// const { useServer } = require('graphql-ws/lib/use/ws');
// const db = require("./config/connection")
const cors = require("cors");

// const app = express();

// async function startApolloServer(typeDefs, resolvers) {
  const schema = makeExecutableSchema({typeDefs, resolvers})
//   const httpServer = createServer(app);
//   const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: '/graphql',
//   });
//   const serverCleanup = useServer({schema}, wsServer);

//   const server = new ApolloServer({
//     // schema,
//     cors: {
//       origin: "*",
//       credentials: true,
//     },
//     schema,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup.dispose();
//           }
//         }
//       }
//     }],
//     context: authMiddleware,
//     // subscriptions: {
//     //   onconnect: (sub) => {
//     //     console.log(sub)
//     //     console.log("WS connected")
//     //   }
//     // }
//   });
//   await server.start();
//   // app.use(express.urlencoded({ extended: false }));
//   // app.use(express.json());
//   server.applyMiddleware({ app });


//   if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client")));
//   } else {
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../client/index.html"));
//     });
//   }
//   httpServer.listen(PORT, () => {
//     console.log(`GQL server running on http://localhost:${PORT}/graphql`)
//     console.log(`WS server running on ws://localhost:${PORT}`)
//   });

// }
// startApolloServer(typeDefs, resolvers);



//test code
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
// const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const main = async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const apolloServer = new ApolloServer({
    schema,
    subscriptions: {
      path: "/subscriptions",
      onConnect: () => {
        console.log("Client connected for subscriptions");
      },
      onDisconnect: () => {
        console.log("Client disconnected from subscriptions");
      },
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  // apolloServer.(httpServer);

  httpServer.listen(3001, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});