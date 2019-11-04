const request = require("supertest");
const { fastify } = require("../index");

describe("Test the root path", () => {
  beforeEach(async () => {
    await fastify.ready();
  });

  test("It should response the GET method", async () => {
    const response = await request(fastify.server).get(
      "/api/v1/dids/did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"
    );
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
