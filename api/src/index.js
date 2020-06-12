import { typeDefs } from './graphql-schema';
import { ApolloServer, PubSub } from 'apollo-server-express';
import express from 'express';
const cors = require('cors');
import neo4j from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
const cookieParser = require('cookie-parser');
import dotenv from 'dotenv';
import startSession from './auth/v1/start-session';
import authenticate from './auth/v1/authenticate';
import callback from './auth/v1/callback';
var bodyParser = require('body-parser');
const resolvers = require('./resolvers');
const http = require('http');
const { createServer, driver } = require('./createServer');

// set environment variables from ../.env
dotenv.config();

const corsOptions = {
  credentials: true,
  origin: [
    'http://localhost',
    'http://localhost:80',
    'http://localhost:4001',
    'http://ui',
  ],
};

const runServer = async () => {
  const app = express();

  app.use(cookieParser());

  const server = await createServer();

  // // decode the JWT so we can get the user Id on each request
  // app.use((req, res, next) => {
  //   const { token } = req.cookies;
  //   console.log(req.cookies);

  //   if (token) {
  //     const { address } = jwt.verify(token, process.env.JWT_SECRET);
  //     // put the userId onto the req for future requests to access
  //     req.userId = address;
  //   }
  //   next();
  // });

  // Specify port and path for GraphQL endpoint
  const port = process.env.GRAPHQL_LISTEN_PORT || 4001;
  const path = '/graphql';

  /*
   * Optionally, apply Express middleware for authentication, etc
   * This also also allows us to specify a path for the GraphQL endpoint
   */
  server.applyMiddleware({ app, path, cors: corsOptions });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // parse application/json
  app.use(bodyParser.json());

  app.post('/auth/v1/start-session', function (req, res) {
    // console.log(req, res);
    startSession(req, res, driver);
  });
  app.post('/auth/v1/authenticate', function (req, res) {
    authenticate(req, res, driver);
  });
  app.get('/auth/v1/callback/:token', function (req, res) {
    callback(req, res, driver);
  });

  // app.listen({ port, path }, () => {
  //   console.log(`GraphQL server ready at http://localhost:${port}${path}`);
  // });

  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${path}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${path}`);
  });
};

try {
  runServer();
} catch (err) {
  console.error(err);
}
