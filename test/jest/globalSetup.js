const config = require('config');
const server = require('../../server.js');

module.exports = async () => {
  await server.listen({ port: config.get('port') });
  global.instance = server;
};
