const faker = require('faker');

function newPost() {
  return {
    title: faker.name.title(),
    body: faker.hacker.phrase(),
    published: faker.random.boolean(),
  };
}

module.exports = {
  newPost,
};
