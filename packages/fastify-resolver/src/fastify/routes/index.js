module.exports = function(fastify, opts, done) {
  fastify.register(require("./schemas"), { prefix: "/schemas" });
  fastify.register(require("./dids"), { prefix: "/api/v1/dids" });

  done();
};
