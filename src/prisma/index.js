const { Prisma } = require('prisma-binding');

const prisma = new Prisma({
  typeDefs: 'prisma/generated.graphql',
  endpoint: 'http://prisma:4466', // :TODO should read from config
  // secret:'thisismysupersecrettext'
});

// prisma.query - prisma.mutation - prisma.subscription - prisma.exists

module.exports = prisma;
