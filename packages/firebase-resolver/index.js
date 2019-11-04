const functions = require("firebase-functions");

const DidKeyFastifyResolver = require("@transmute/did-key-fastify-resolver");

const config = require("./config");

const server = new DidKeyFastifyResolver(config);

exports.main = functions.https.onRequest((req, res) => {
  server.fastify.ready(err => {
    if (err) throw err;
    server.handleRequest({ ...req, ip: "" }, res);
  });
});
