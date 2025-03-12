import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log("Server ready at http://localhost:4000/graphql"));
});
