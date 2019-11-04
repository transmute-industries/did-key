const path = require("path");
const fs = require("fs");

const loadSchema = ({ vendor, name, format, version }) => {
  return JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, vendor, name, format, version + ".jsonld")
      )
      .toString()
  );
};

const loadAllSchemas = () => {
  // TODO: parse directory...
  return {
    didDocument: loadSchema({
      vendor: "com.transmute.did",
      name: "didDocument",
      format: "jsonschema",
      version: "1-0-0"
    })
  };
};

class SchemaManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.rawSchemas = loadAllSchemas();
    this.all = {};
    Object.keys(this.rawSchemas).forEach(key => {
      const schema = this.rawSchemas[key];
      let modifiedSchema = {
        ...schema,
        $schema: schema.$schema.replace(
          "https://did-key.transmute.org",
          this.baseUrl
        )
      };
      this.all[key] = modifiedSchema;
    });
    // this.rewriteBaseUrl();
  }

  // rewriteBaseUrl() {
  //   this.all = {};
  // }
}

module.exports = SchemaManager;
