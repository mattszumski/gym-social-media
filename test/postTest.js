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
const testRandomInt = Math.floor(Math.random() * 10000 + 1);

describe("Posts tests", function () {
  it("Log in user and get jwtCookie for testing", async function () {
    const payload = { authfield: testUsername, password: testPassword };
    const response = await agent.post("/auth/login").send(payload);
    jwtCookie = response.headers["set-cookie"][0].split(";")[0].replace("token=", "");
    testUserId = response.body.userId;

    expect(jwtCookie).length.to.be.above(0);
    expect(testUserId).to.be.above(0);
  });

  describe("Add, get and delete posts", function () {
    let postId = 0;

    it("Should add a new post", async function () {
      const payload = { text: `testText${testRandomInt}`, media: `testMedia${testRandomInt}` };
      const addPostResponse = await agent
        .post("/post/")
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(addPostResponse.status).to.equal(201);
      postId = addPostResponse.body.id;
    });

    it("Should get a previously created post", async function () {
      const getPostByIdResponse = await agent
        .get(`/post/${postId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      expect(getPostByIdResponse.status).to.equal(200);
      expect(getPostByIdResponse.body).to.have.property("text").eq(`testText${testRandomInt}`);
      expect(getPostByIdResponse.body).to.have.property("media").eq(`testMedia${testRandomInt}`);
    });

    it("Number of user posts should be above 0", async function () {
      const getUserPostsResponse = await agent.get(`/post/user/${testUserId}`).send();

      expect(getUserPostsResponse.status).to.equal(200);
      expect(getUserPostsResponse.body).length.to.be.above(0);
    });

    it("User should be able to modify its own post", async function () {
      const payload = { text: `patchText${testRandomInt}`, media: `patchMedia${testRandomInt}` };
      const modifyPostResponse = await agent
        .patch(`/post/${postId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(modifyPostResponse.status).to.equal(200);
      expect(modifyPostResponse.body).to.have.property("text").eq(`patchText${testRandomInt}`);
      expect(modifyPostResponse.body).to.have.property("media").eq(`patchMedia${testRandomInt}`);
      expect(modifyPostResponse.body).to.have.property("edited").eq(true);
    });

    it("Should delete previously created post", async function () {
      await agent
        .delete(`/post/${postId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      const getPostByIdResponse = await agent
        .get(`/post/${postId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      expect(getPostByIdResponse.status).to.equal(404);
    });

    it("Should get user friends' posts", async function () {
      const getFriendsPostsResponse = await agent
        .get(`/post/user/my`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      expect(getFriendsPostsResponse.status).to.equal(200);
      expect(getFriendsPostsResponse.body).to.be.an("array");
    });
  });
});
