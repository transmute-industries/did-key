const didKeyDriver = require("did-method-key").driver();

const resolve = async did => {
  const didDocument = await didKeyDriver.get({
    did
  });
  return didDocument;
};

module.exports = { resolve };
