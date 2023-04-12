import dbConnection from "../configs/dbConnection.js";
import dotenv from "dotenv";
import { createUserInDb } from "./UserService.js";
import { createUserAuthInDb } from "./UserAuthService.js";

dotenv.config();

export const setupDb = async () => {
  return dbConnection.sync({
    force: true,
  });
};

export const setupBasicUsers = async () => {
  const basicUsersData = [
    {
      username: process.env.TEST_ACCOUNT_USERNAME || "",
      email: process.env.TEST_ACCOUNT_EMAIL || "",
      password: process.env.TEST_ACCOUNT_PASSWORD || "",
    },
    {
      username: process.env.TEST_ACCOUNT_USERNAME2 || "",
      email: process.env.TEST_ACCOUNT_EMAIL2 || "",
      password: process.env.TEST_ACCOUNT_PASSWORD2 || "",
    },
  ];

  for (const newUserData of basicUsersData) {
    createUserInDb(newUserData)
      .then((result) => {
        if (!result) {
          throw "User not created during setup. Please retry.";
        }
        console.log(result);
        return result.get("id");
      })
      .then((userId) => {
        createUserAuthInDb(userId as number, newUserData.password!);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
