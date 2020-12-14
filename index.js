const config = require('config');
const server = require('./server');

server.listen({ port: config.get('port') }).then(({ url }) => {
  console.log(`* Server ready at ${url}`);
});
module.exports = server;
