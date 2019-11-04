const DidKeyFastifyResolver = require("./index");

const config = require("./config");

const server = new DidKeyFastifyResolver(config);

server.fastify.listen(config.port, "0.0.0.0", (err, address) => {
  if (err) throw err;
  server.fastify.log.info(`server listening on ${address}`);
});
