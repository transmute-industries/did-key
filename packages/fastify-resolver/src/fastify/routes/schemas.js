module.exports = function(fastify, opts, done) {
  const { schemas } = fastify.svcs;
  Object.keys(schemas.all).forEach(key => {
    const schema = schemas.all[key];
    const schemaPath = schema.$schema
      .replace(schemas.baseUrl + "/schemas", "")
      .replace("#", "");
    fastify.get(
      schemaPath,
      {
        schema: {
          tags: ["schemas"],
          response: {
            200: schema
          }
        }
      },
      async (req, reply) => {
        reply.send(schema);
      }
    );
  });
  done();
};
