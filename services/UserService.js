import User, { profileAssociation, settingsAssociation } from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import UserSettings from "../models/UserSettings.js";

export const createUserInDb = async (userData) => {
  try {
    const creationData = { ...userData, userSetting: {}, userProfile: {} };
    const newUser = await User.create(creationData, { include: [settingsAssociation, profileAssociation] });
    return newUser;
  } catch (error) {
    return Promise.reject(error.errors);
  }
};

export const getDbUsers = async () => {
  //TODO:Check filters and apply
  const users = User.findAll({});

  return users;
};

export const getDbUserWithId = async (id) => {
  const user = User.findByPk(id);

  return user;
};

export const getUserData = async (userId) => {
  return User.findOne({
    where: {
      id: userId,
    },
    include: [{ model: UserProfile, attributes: ["city", "gym", "about"] }, UserSettings],
  });
};

export const editDbUserWithId = async (id, data) => {
  const user = await getDbUserWithId(id);
  if (user) {
    user.update({ id, ...data });
    return user;
  }

  return null;
};

export const deleteDbUserWithId = async (id) => {
  const user = await getDbUserWithId(id);
  if (user) {
    const result = await user.destroy();
    return result;
  }

  return null;
};

export const getUserByUsername = () => {
  //TODO
};

export const getUserByEmail = () => {
  //TODO
};

export const checkIfUserExistsInDb = (email, username) => {
  //TODO
};
