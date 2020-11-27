const { ApolloServer, PubSub } = require('apollo-server');
const { importSchema } = require('graphql-import');
const config = require('config');
const resolvers = require('./resolvers');

const typeDefs = importSchema('./graphql/schema.graphql');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
