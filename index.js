const { ApolloServer, PubSub } = require('apollo-server');
const { importSchema } = require('graphql-import');
const config = require('config');
require('./src/prisma');
const resolvers = require('./src/resolvers');
const prisma = require('./src/prisma');

const typeDefs = importSchema('./graphql/schema.graphql');
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub, prisma },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
