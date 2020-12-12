const jwt = require('jsonwebtoken');

module.exports = async (request) => {
  const authorizationHeader = request?.req?.headers?.authorization
    || request?.connection?.context?.authorization;

  if (!authorizationHeader) throw Error('Authorization required');

  const token = authorizationHeader.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'thisissecret');

  return decoded.userId;
};
