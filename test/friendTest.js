import { expect } from "chai";
import request from "supertest";

import dotenv from "dotenv";

dotenv.config();

const localAddress = "http://localhost:4000";
const agent = request.agent(localAddress);
const testUsername = process.env.TEST_ACCOUNT_USERNAME;
const testPassword = process.env.TEST_ACCOUNT_PASSWORD;
let testUserId = 0;
let jwtCookie = "";

const testUsername2 = process.env.TEST_ACCOUNT_USERNAME2;
const testPassword2 = process.env.TEST_ACCOUNT_PASSWORD2;
let testUserId2 = 0;
let jwtCookie2 = "";
const testRandomInt = Math.floor(Math.random() * 10000 + 1);

describe("Friends tests", function () {
  it("Log in both users and get theirs jwtCookies for testing", async function () {
    const payload = { authfield: testUsername, password: testPassword };
    const response = await agent.post("/auth/login").send(payload);
    jwtCookie = response.headers["set-cookie"][0].split(";")[0].replace("token=", "");
    testUserId = response.body.userId;

    const payload2 = { authfield: testUsername2, password: testPassword2 };
    const response2 = await agent.post("/auth/login").send(payload2);
    jwtCookie2 = response2.headers["set-cookie"][0].split(";")[0].replace("token=", "");
    testUserId2 = response2.body.userId;

    //find a way to test if string has length
    expect(jwtCookie).length.to.be.above(0);
    expect(jwtCookie2).length.to.be.above(0);
    expect(testUserId).to.be.above(0);
    expect(testUserId2).to.be.above(0);
  });

  describe("Add, get and remove friends", function () {
    it("Should add a new friend", async function () {
      const payload = { friendId: testUserId2 };
      const addFriendResponse = await agent
        .post("/friend/")
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(addFriendResponse.status).to.equal(201);

      const getFriendsResponse = await agent
        .get("/friend/")
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      expect(getFriendsResponse.status).to.equal(200);
      expect(getFriendsResponse.body).length.to.be.above(0);
    });

    it("Should delete previously added friend", async function () {
      const payload = { friendId: testUserId };
      const deleteFriendResponse = await agent
        .delete("/friend/")
        .set("Authorization", "Bearer " + jwtCookie2)
        .send(payload);

      expect(deleteFriendResponse.status).to.equal(200);

      const getFriendsResponse = await agent
        .get("/friend/")
        .set("Authorization", "Bearer " + jwtCookie2)
        .send();

      expect(getFriendsResponse.status).to.equal(200);
      expect(getFriendsResponse.body).to.be.an("array").that.is.empty;
    });
  });

  describe("Create, check and delete friend requests", function () {
    it("Should add a new friend request", async function () {
      const payload = { senderId: testUserId };
      const friendRequestResponse = await agent
        .post("/friend/request")
        .set("Authorization", "Bearer " + jwtCookie2)
        .send(payload);

      expect(friendRequestResponse.status).to.equal(201);
    });

    //check received request by user 1
    it("User 1 should have received friend request", async function () {
      const receivedRequestResponse = await agent
        .get("/friend/request")
        .set("Authorization", "Bearer " + jwtCookie)
        .send();
      expect(receivedRequestResponse.status).to.equal(200);
      expect(receivedRequestResponse.body).to.be.an("array").that.is.not.empty;
    });
    //check sent request by user 2
    it("User 2 should have array of sent friend requests", async function () {
      const sentRequestResponse = await agent
        .get("/friend/request/sent")
        .set("Authorization", "Bearer " + jwtCookie2)
        .send();
      expect(sentRequestResponse.status).to.equal(200);
      expect(sentRequestResponse.body).to.be.an("array").that.is.not.empty;
    });

    it("Should delete friend request", async function () {
      const payload = { senderId: testUserId2 };
      const deleteFriendRequestResponse = await agent
        .delete("/friend/request")
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(deleteFriendRequestResponse.status).to.equal(200);
    });
  });
});
