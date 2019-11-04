module.exports = function(fastify, opts, done) {
  fastify.register(require("./dids"), { prefix: "/dids" });
  fastify.register(require("./schemas"), { prefix: "/schemas" });

  done();
};
