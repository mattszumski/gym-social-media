import { expect } from "chai";
import request from "supertest";

const localAddress = "http://localhost:4000";
const agent = request.agent(localAddress);
let jwtCookie = "";
const randomIdForTest = Math.floor(Math.random() * 100000 + 1);
const username = `test${randomIdForTest}`;
const password = `pass123`;

describe("Origin testing", function () {
  it("Request should return 200 as it comes from origin in Cors options", async function () {
    const allowedOriginresponse = await agent.get("/").set("Origin", "http://localhost:3000");
    expect(allowedOriginresponse.status).to.equal(200);
  });

  it("Request should error as it comes from origin not in Cors options", async function () {
    const notAllowedOriginresponse = await agent.get("/").set("Origin", "http://localhost:1234");
    expect(notAllowedOriginresponse.status).to.equal(500);
  });
});

describe("404 testing", function () {
  it("Should return 404 response", async function () {
    const notExistingRouteResponse = await agent.get("/iwillnevergonnagiveyouup");
    expect(notExistingRouteResponse.status).to.equal(404);
  });
});
