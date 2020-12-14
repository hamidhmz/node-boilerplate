const { ApolloClient } = require('apollo-boost');
const config = require('config');
const serverFactory = require('../../factory/serverFactory.js')();
const userFactoryFaker = require('../../factory/userFactoryFaker.js');
const prisma = require('../../../../src/prisma/index.js');

const client = new ApolloClient({
  uri: `http://localhost:${config.get('port')}`,
});
const { gql } = ApolloClient;
describe('Create an user', () => {
  beforeEach(async () => {
    await serverFactory.beforeEach();
  });
  it('should create an user', async () => {
    const user = userFactoryFaker.newUser();
    const createUser = gql`
      mutation($name: String!, $email: String!, $password: String!, $age: Int) {
        createUser(
          data: { name: $name, email: $email, password: $password, age: $age }
        ) {
          user {
            name
            email
            age
          }
          token
        }
      }
    `;
    const response = await client.mutate({
      mutation: createUser,
      variables: user,
    });

    const userExists = await prisma.exists.User({
      email: user.email,
      name: user.name,
      age: user.age,
    });
    expect(userExists).toBeTruthy();
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('createUser');
    expect(response.data.createUser).toHaveProperty('user');
    expect(user).toMatchObject({ ...response.data.createUser.user });
    expect(response.data.createUser).toHaveProperty('token');
    expect(typeof response.data.createUser.token).toBe('string');
  }, 10000);
});
