const config = require("../../config");

// See https://github.com/fastify/fastify/blob/master/docs/Routes.md#route-prefixing
// eslint-disable-next-line func-names
module.exports = function(fastify, opts, done) {
  const { schemas, resolver } = fastify.svcs;

  fastify.get(
    "/:did",
    {
      schema: {
        description: "DIDs GET",
        tags: ["DID"],
        summary: "Resolver Endpoint",
        params: {
          type: "object",
          properties: {
            did: {
              type: "string",
              description: "A valid DID Key string"
            }
          }
        },
        response: {
          200: {
            description: "A DID Document",
            type: "object",
            // Avoid issues with SDJS, and include useful description here ^
            properties: schemas.didDocument.properties
          }
        }
      }
    },
    async (req, reply) => {
      const didDoc = await resolver.resolve(req.params.did);
      reply.send(didDoc);
    }
  );

  fastify.post("/test", async (req, reply) => {
    console.log();
    reply.send({
      ok: true,
      echo: {
        // This should be done in app.addContentTypeParser("*", function(req, done) {
        // doing it here just for demo purposes...
        parsed: JSON.parse(req.body.rawBody.toString())
      }
    });
  });

  done();
};
