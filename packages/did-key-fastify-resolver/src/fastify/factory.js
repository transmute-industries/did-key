/* eslint-disable global-require */
const fastify = require("fastify");
const fastifySwagger = require("fastify-swagger");

const getFastify = opts => {
  const app = fastify({
    ...opts,
    ignoreTrailingSlash: true
  });

  app.register(require("./services/services-connector"), {
    baseUrl: opts.config.baseUrl
  });

  // Swagger must be registered before the routes
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "DID Key Resolver",
        description: "DID Key Resolver Swagger Definition",
        version: "0.1.0"
      }
    },
    exposeRoute: true,
    routePrefix: "api/docs"
  });

  // Enable CORS
  app.register(require("fastify-cors"));

  // Add routes
  const prefix = opts.prefix || "";
  app.register(require("./routes"), { prefix: `${prefix}/api` });

  return { fastify: app };
};

module.exports = { getFastify };
