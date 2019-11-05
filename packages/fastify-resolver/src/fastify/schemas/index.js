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
    self: loadSchema({
      vendor: "com.transmute.self-desc",
      name: "schema",
      format: "jsonschema",
      version: "1-0-0"
    }),
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
        $schema: schema.$schema.replace("https://did-key.web.app", this.baseUrl)
      };
      delete modifiedSchema.$id;

      this.all[key] = {
        name: key,
        path: schema.$id
          .replace("https://did-key.web.app/api/schemas", "")
          .replace("#", ""),
        schema: modifiedSchema
      };
    });
  }
}

module.exports = SchemaManager;
