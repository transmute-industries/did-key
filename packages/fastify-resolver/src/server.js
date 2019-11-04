const { fastify } = require("./fastify");
const config = require("./config");

fastify.listen(config.port, "0.0.0.0", (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
