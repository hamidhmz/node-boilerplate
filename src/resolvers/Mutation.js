const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  /* -------------------------------------------------------------------------- */
  /*                               create examples                              */
  /* -------------------------------------------------------------------------- */
  async createUser(parent, args, { prisma }) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer');
    }
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error('Email taken');
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const user = prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisissecret'),
    };
  },

  async createPost(parent, args, { prisma, utils, request }, info) {
    const userId = await utils.getUserIdFromTokenInsideHeader(request);

    const user = await prisma.exists.User({ id: userId });

    if (!user) {
      throw new Error('Author does not exists');
    }

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info,
    );
  },
  async createComment(parent, args, { prisma }, info) {
    const user = await prisma.exists.User({ id: args.data.author });

    if (!user) {
      throw new Error('Author does not exists');
    }

    const post = await prisma.exists.Post({ id: args.data.post });

    if (!post) {
      throw new Error('Post does not exists');
    }

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info,
    );
  },

  /* -------------------------------------------------------------------------- */
  /*                             example for delete                             */
  /* -------------------------------------------------------------------------- */
  async deleteUser(parent, args, { prisma }, info) {
    const user = await prisma.exists.User({ id: args.id });

    if (!user) {
      throw Error('user does not exits');
    }

    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async deletePost(parent, args, { prisma, utils, request }, info) {
    const userId = await utils.getUserIdFromTokenInsideHeader(request);

    const post = await prisma.exists.Post({
      id: args.id,
      author: { id: userId },
    });

    if (!post) {
      throw Error('post does not exits');
    }

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async deleteComment(parent, args, { prisma }, info) {
    const comment = await prisma.exists.Comment({ id: args.id });

    if (!comment) {
      throw Error('comment does not exits');
    }

    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  /* -------------------------------------------------------------------------- */
  /*                             example for update                             */
  /* -------------------------------------------------------------------------- */
  async updateUser(parent, args, { prisma }, info) {
    const user = await prisma.exists.User({ id: args.id });

    if (!user) {
      throw Error('user does not exits');
    }
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    );
  },
  async updateComment(parent, args, { prisma }, info) {
    const comment = await prisma.exists.Comment({ id: args.id });

    if (!comment) {
      throw Error('comment does not exits');
    }
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    );
  },
  async updatePost(parent, args, { prisma }, info) {
    const post = await prisma.exists.Post({ id: args.id });

    if (!post) {
      throw Error('post does not exits');
    }
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    );
  },

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw Error('Unable to login');
    }

    return {
      user,
      token: await jwt.sign({ userId: user.id }, 'thisissecret'),
    };
  },
};
