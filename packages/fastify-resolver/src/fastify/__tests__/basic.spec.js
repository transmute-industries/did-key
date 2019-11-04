const request = require("supertest");

const DidKeyFastifyResolver = require("../index");

const config = require("../../config");

const server = new DidKeyFastifyResolver(config);

describe("DID Key Resolver", () => {
  beforeEach(async () => {
    await server.fastify.ready();
  });

  test("Can get meta schema", async () => {
    const response = await request(server.fastify.server).get(
      "/schemas/com.transmute.self-desc/schema/jsonschema/1-0-0.jsonld"
    );
    expect(response.statusCode).toBe(200);
  });

  test("Can get didDocument schema", async () => {
    const response = await request(server.fastify.server).get(
      "/schemas/com.transmute.did/didDocument/jsonschema/1-0-0.jsonld"
    );
    expect(response.statusCode).toBe(200);
  });

  test("Can resolve a did:key", async () => {
    const response = await request(server.fastify.server).get(
      "/dids/did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
      "@context": "https://w3id.org/did/v1",
      publicKey: [
        {
          id: "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
          type: "Ed25519VerificationKey2018",
          controller:
            "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
          publicKeyBase58: "B12NYF8RrR3h41TDCTJojY59usg3mbtbjnFs7Eud1Y6u"
        }
      ],
      authentication: [
        "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"
      ],
      assertionMethod: [
        "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"
      ],
      capabilityDelegation: [
        "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"
      ],
      capabilityInvocation: [
        "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"
      ],
      keyAgreement: [
        {
          id:
            "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH#zBzoR5sqFgi6q3iFia8JPNfENCpi7RNSTKF7XNXX96SBY4",
          type: "X25519KeyAgreementKey2019",
          controller:
            "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
          publicKeyBase58: "JhNWeSVLMYccCk7iopQW4guaSJTojqpMEELgSLhKwRr"
        }
      ]
    });
  });
});
