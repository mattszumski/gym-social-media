import { Op, fn, col, where } from "sequelize";
import User, { profileAssociation, settingsAssociation } from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import UserSettings from "../models/UserSettings.js";
import { deleteUserAuthData } from "./UserAuthService.js";
import { IUserAuth, IUserProfile } from "../types/Interfaces/UserInterfaces.js";

export const createUserInDb = async (userData: IUserAuth) => {
  try {
    const creationData = { ...userData, userSetting: {}, userProfile: {} };
    const newUser = await User.create(creationData, { include: [settingsAssociation, profileAssociation] });
    return newUser;
  } catch (error: any) {
    return Promise.reject(error.errors);
  }
};

export const getDbUsers = async (query: string) => {
  if (!query) {
    return Promise.reject();
  }
  //TODO: Sanitize input
  const normalizedQuery = query.toLowerCase();
  const users = User.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${normalizedQuery}%`,
          },
        },
        {
          firstname: {
            [Op.like]: `%${normalizedQuery}%`,
          },
        },
        {
          lastname: {
            [Op.like]: `%${normalizedQuery}%`,
          },
        },
      ],
    },
    include: [{ model: UserProfile, attributes: ["city", "gym"] }],
  });

  return users;
};

export const getDbUserWithId = async (id: number) => {
  const user = User.findByPk(id);

  return user;
};

export const getUserData = async (userId: number) => {
  return User.findOne({
    where: {
      id: userId,
    },
    include: [{ model: UserProfile, attributes: ["city", "gym", "about", "profilePhotoId"] }, UserSettings],
  });
};

export const editDbUserWithId = async (id: number, data: IUserProfile) => {
  const user = await getDbUserWithId(id);
  if (user) {
    user.update({ id, ...data });
    return user;
  }

  return null;
};

export const deleteDbUserWithId = async (id: number) => {
  const user = await getDbUserWithId(id);
  if (user) {
    const result = await user.destroy();
    deleteUserAuthData(user?.id || 0);
    return result;
  }
  //TODO: delete user auth

  return null;
};

export const getUserByColumn = (input: string, columnName: string) => {
  if (!input || !columnName) {
    return null;
  }

  const normalizedInput = input.toLowerCase();
  try {
    return User.findOne({
      where: {
        [Op.or]: where(fn("LOWER", col(`${columnName}`)), input),
      },
    });
  } catch (err) {
    console.log(err);
    Promise.reject({ success: false, reason: "Bad request" });
  }
};

export const checkIfUserExistsInDb = async (email: string, username: string) => {
  const emailExists = await getUserByColumn(email, "email");
  const usernameExists = await getUserByColumn(username, "username");
  console.log(emailExists);
  console.log(usernameExists);

  if (emailExists || usernameExists) {
    return true;
  }
  return false;
};
