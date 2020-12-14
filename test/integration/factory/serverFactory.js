const prisma = require('../../../src/prisma/index.js');

function serverFactory() {
  return {
    async beforeEach() {
      await prisma.mutation.deleteManyUsers();
      await prisma.mutation.deleteManyPosts();
      await prisma.mutation.deleteManyComments();
    },
  };
}

module.exports = serverFactory;
