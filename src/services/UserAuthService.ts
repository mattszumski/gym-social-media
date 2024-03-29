import UserAuth from "../models/UserAuth.js";
import User from "../models/User.js";
import { Op, fn, col, where } from "sequelize";
import { hashPassword, signJWT, validatePassword } from "../utils/AuthUtils.js";

export const createUserAuthInDb = async (userId: number, password: string) => {
  const { salt, hashedPassword } = hashPassword(password);
  try {
    return UserAuth.create({ userId, password: hashedPassword, salt });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserIdByEmailOrUsername = (input: string) => {
  const normalizedInput = input.toLowerCase();
  return User.findOne({
    where: {
      [Op.or]: [where(fn("LOWER", col("username")), normalizedInput), where(fn("LOWER", col("email")), normalizedInput)],
    },
  });
};

// export const getUserAuthDataByLogin = async (userLogin: string) => {
//   //TODO
//   const user = await getUserIdByEmailOrUsername(userLogin);
//   if (!user) {
//     return null;
//   } else {
//     return UserAuth.findOne({
//       where: {
//         userId: user.id,
//       },
//     });
//   }
// };

export const getUserAuthDataByUserId = async (userId: number) => {
  return UserAuth.findOne({
    where: {
      userId,
    },
  });
};

export const authenticateUser = async (userId: number, password: string) => {
  //get data from request
  const authData = await getUserAuthDataByUserId(userId);
  if (!authData) {
    return "";
  }

  // check against db data
  const passwordValidated = validatePassword(password, authData.password, authData.salt);

  // autorize or not
  if (passwordValidated) {
    return signJWT(authData);
  }

  return "";
};

export const createLogoutToken = () => {
  const data = {
    loggedOut: true,
  };

  return signJWT(data);
};

export const deleteUserAuthData = async (userId: number) => {
  const userAuth = await UserAuth.findOne({
    where: {
      userId,
    },
  });

  if (userAuth) {
    userAuth.destroy();
  }
};
