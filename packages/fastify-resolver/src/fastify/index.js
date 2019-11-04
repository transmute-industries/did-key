const http = require("http");
const fastify = require("fastify");
const fastifySwagger = require("fastify-swagger");
const config = require("../config");

let handleRequest = null;
let opts = {};

const serverFactory = handler => {
  handleRequest = handler;
  return http.createServer();
};

if (config.serverEnv === "FIREBASE") {
  opts = { serverFactory };
} else if (config.serverEnv === "STANDALONE") {
  opts = { logger: false };
}

const app = fastify(opts);

app.register(require("./services/services-connector"), {
  baseUrl: config.baseUrl
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
app.register(require("./routes"), { prefix: "/" });

module.exports = { fastify: app, handleRequest };
