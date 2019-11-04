module.exports = function(fastify, opts, done) {
  const { schemas } = fastify.svcs;

  Object.keys(schemas.all).forEach(key => {
    const schema = schemas.all[key];

    fastify.get(
      schema.path,
      {
        schema: {
          tags: ["Schema"],
          response: {
            // 200: schema
          }
        }
      },
      async (req, reply) => {
        reply.send(schema.schema);
      }
    );
  });
  done();
};
