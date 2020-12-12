const Subscription = {
  comment: {
    async subscribe(parent, { postId }, { prisma, utils, request }, info) {
      await utils.getUserIdFromTokenInsideHeader(request);

      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info,
      );
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info,
      );
    },
  },
};

module.exports = Subscription;
