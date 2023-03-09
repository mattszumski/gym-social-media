import { expect } from "chai";
import request from "supertest";

import dotenv from "dotenv";

dotenv.config();

const localAddress = "http://localhost:4000";
const agent = request.agent(localAddress);
let jwtCookie = "";
let testUsername = process.env.TEST_ACCOUNT_USERNAME;
let testPassword = process.env.TEST_ACCOUNT_PASSWORD;
let testUserId = 0;
const testRandomInt = Math.floor(Math.random() * 10000 + 1);

describe("User test", async function () {
  const payload = { authfield: testUsername, password: testPassword };
  const response = await agent.post("/auth/login").send(payload);
  jwtCookie = response.headers["set-cookie"][0].split(";")[0].replace("token=", "");
  testUserId = response.body.userId;

  describe("User tests", function () {
    it("Should be more than one user", async function () {
      const userResponse = await agent.get(`/user?q=${testUsername}`);
      expect(userResponse.body).to.be.length.above(0);
    });

    it("User can get its own data", async function () {
      expect(testUserId).to.not.be.equal(0);
      const userIdResponse = await agent.get(`/user/${testUserId}`);
      expect(userIdResponse.body).to.have.property("username");
      expect(userIdResponse.body).to.have.property("email");
      expect(userIdResponse.body).to.have.property("id");
    });

    it("User can modify its own data", async function () {
      const testRandomInt = Math.floor(Math.random() * 10000 + 1);
      const firstname = `firstnameTest${testRandomInt}`;
      const lastname = `lastnameTest${testRandomInt}`;
      const payload = { firstname, lastname };

      const patchResponse = await agent
        .patch(`/user/${testUserId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(patchResponse.status).to.be.equal(200);
      expect(patchResponse.body.firstname).to.be.equal(firstname);
      expect(patchResponse.body.lastname).to.be.equal(lastname);
    });

    // TODO: think of the best way to test deleting the profile (Backlog)
  });

  describe("User profile test", async function () {
    it("User should get its user profile data", async function () {
      const userProfileResponse = await agent
        .get(`/user/profile/${testUserId}`)

        .send();

      expect(userProfileResponse.body).to.have.property("city");
      expect(userProfileResponse.body).to.have.property("gym");
      expect(userProfileResponse.body).to.have.property("about");
    });

    it("User can modify its own profile data", async function () {
      const city = `cityTest${testRandomInt}`;
      const gym = `gymTest${testRandomInt}`;
      const about = `aboutTest${testRandomInt}`;
      const payload = { city, gym, about };

      const userProfilePatchResponse = await agent
        .patch(`/user/profile/${testUserId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(userProfilePatchResponse.status).to.be.equal(200);
      expect(userProfilePatchResponse.body.city).to.be.equal(city);
      expect(userProfilePatchResponse.body.gym).to.be.equal(gym);
      expect(userProfilePatchResponse.body.about).to.be.equal(about);
    });
  });

  describe("User settings test", async function () {
    it("User can get its own settings data", async function () {
      const userSettingsResponse = await agent
        .get(`/user/settings/${testUserId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send();

      expect(userSettingsResponse.status).to.be.equal(200);
      expect(userSettingsResponse.body).to.have.property("language");
    });

    it("User can change its own settings data", async function () {
      const language = `languageTest${testRandomInt}`;
      const payload = { language };
      const userSettingsPatchResponse = await agent
        .patch(`/user/settings/${testUserId}`)
        .set("Authorization", "Bearer " + jwtCookie)
        .send(payload);

      expect(userSettingsPatchResponse.status).to.be.equal(200);
      expect(userSettingsPatchResponse.body.language).to.be.equal(language);
    });
  });
});
