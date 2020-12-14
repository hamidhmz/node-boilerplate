const faker = require('faker');

function newUser() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    age: faker.random.number(),
  };
}

module.exports = {
  newUser,
};
