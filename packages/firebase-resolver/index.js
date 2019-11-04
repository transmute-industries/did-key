const functions = require("firebase-functions");
const {
  fastify,
  handleRequest
} = require("@transmute/did-key-fastify-resolver");

exports.main = functions.https.onRequest((req, res) => {
  fastify.ready(err => {
    if (err) throw err;
    handleRequest({ ...req, ip: "" }, res);
  });
});
