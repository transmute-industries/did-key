const functions = require("firebase-functions");

const DidKeyFastifyResolver = require("@transmute/did-key-fastify-resolver");

const config = require("./config");

const server = new DidKeyFastifyResolver(config);

exports.main = functions.https.onRequest((req, res) => {
  server.fastify.ready(err => {
    if (err) throw err;

    // { ...req, ip: "" }
    // req.hostname = "";

    // Object.defineProperty(req, "hostname", {
    //   set: function(a) {
    //     return a;
    //   }
    // });
    // Object.defineProperty(req, "ip", {
    //   set: function(a) {
    //     return a;
    //   }
    // });

    // Object.defineProperty(req, "ips", {
    //   set: function(a) {
    //     return a;
    //   }
    // });

    // req.on = (eventType, callback) => {
    //   console.log(eventType, callback);
    //   callback();
    // };

    // Object.defineProperty(req, "on", function(eventType, callback) {
    //   console.log(eventType, callback);
    //   callback();
    // });

    // Object.defineProperty(req, "hostname", {
    //   set: function(a) {
    //     return a;
    //   }
    // });
    req.headers["content-type2"] = req.headers["content-type"];
    delete req.headers["content-type"];

    server.handleRequest(req, res);
  });
});
