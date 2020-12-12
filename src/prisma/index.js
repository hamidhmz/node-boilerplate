const { Prisma } = require('prisma-binding');
const config = require('config');

const prisma = new Prisma({
  typeDefs: 'prisma/generated.graphql',
  endpoint: config.get('prisma-endpoint'),
  // secret:'thisismysupersecrettext'
});

// prisma.query - prisma.mutation - prisma.subscription - prisma.exists

module.exports = prisma;
