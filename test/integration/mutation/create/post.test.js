const { gql } = require('apollo-boost');
const jwt = require('jsonwebtoken');
const serverFactory = require('../../factory/serverFactory.js')();
const postFactoryFaker = require('../../factory/postFactoryFaker.js');
const userFactoryFaker = require('../../factory/userFactoryFaker.js');
const prisma = require('../../../../src/prisma/index.js');

describe('this is just a test', () => {
  beforeEach(async () => {
    await serverFactory.beforeEach();
  });
  it('should calculate in right way', async () => {
    const user = userFactoryFaker.newUser();

    const createdUser = await prisma.mutation.createUser(
      {
        data: user,
      },
      '{id} ',
    );
    console.log('8878787878',createdUser);
    // const createUser = gql`
    //   mutation($name: String!, $email: String!, $password: String!, $age: Int) {
    //     createUser(
    //       data: { name: $name, email: $email, password: $password, age: $age }
    //     ) {
    //       user {
    //         name
    //         email
    //         age
    //       }
    //       token
    //     }
    //   }
    // `;
    // await apolloClient.setOptions({
    //   // If "request" or "response" is not specified, it's not modified
    //   request: {
    //     headers: {
    //       authorization: jwt.sign({ userId: user.id }, 'thisissecret'),
    //     },
    //   },
    // });
    // const response = await apolloClient.mutate({
    //   mutation: createUser,
    //   variables: user,
    // });

    // const userExists = await prisma.exists.User({
    //   email: user.email,
    //   name: user.name,
    //   age: user.age,
    // });
    // expect(userExists).toBeTruthy();
    // expect(response).toHaveProperty('data');
    // expect(response.data).toHaveProperty('createUser');
    // expect(response.data.createUser).toHaveProperty('user');
    // expect(user).toMatchObject({ ...response.data.createUser.user });
    // expect(response.data.createUser).toHaveProperty('token');
    // expect(typeof response.data.createUser.token).toBe('string');
  }, 10000);
});
