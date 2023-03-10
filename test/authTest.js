import { expect } from "chai";
import request from "supertest";

const localAddress = "http://localhost:4000";
const agent = request.agent(localAddress);
let jwtCookie = "";
let userId = "";
const randomIdForTest = Math.floor(Math.random() * 100000 + 1);
const username = `test${randomIdForTest}`;
const password = `pass123`;

describe("signup", function () {
  describe("Creating user", function () {
    it("Should create user and receive jwt", async function () {
      const payload = { username, email: `${username}@testgymsocialmedia.com`, password };

      const response = await agent.post("/auth/signup").send(payload);
      jwtCookie = response.headers["set-cookie"][0].split(";")[0].replace("token=", "");
      expect(response.status).to.equal(200);
    });
  });
});

describe("logout", function () {
  it("Should logout already logged in user and forbid access to protected route", async function () {
    const logoutResponse = await agent
      .get("/auth/logout")
      .set("Authorization", "Bearer " + jwtCookie)
      .send();
    jwtCookie = logoutResponse.headers["set-cookie"][0].split(";")[0].replace("token=", "");
  });

  it("Should not be able to access protected route", async function () {
    // /post/user/my is one of the protected routes
    const protectedRouteResponse = await agent
      .get("/post/user/my")
      .set("Authorization", "Bearer " + jwtCookie)
      .send();

    expect(protectedRouteResponse.status).to.equal(401);
  });
});

describe("login", function () {
  describe("logging in", function () {
    it("Should log in and receive jwt", async function () {
      const payload = { authfield: username, password };
      const loginResponse = await agent.post("/auth/login").send(payload);
      expect(loginResponse.status).to.equal(200);
      jwtCookie = loginResponse.headers["set-cookie"][0].split(";")[0].replace("token=", "");
      userId = loginResponse.body.userId;
    });

    it("Should be able to access protected route", async function () {
      // /post/user/my is one of the protected routes
      const protectedRouteResponse = await agent
        .get("/post/user/my")
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      expect(protectedRouteResponse.status).to.equal(200);
    });
  });
});

describe("cleanup", function () {
  it("should delete user and its data", async function () {
    const deleteRouteResponse = await agent
      .delete(`/user/${userId}`)
      .set("Authorization", "Bearer " + jwtCookie)
      .send();

    expect(deleteRouteResponse.status).to.equal(200);
  });
});
