import dbConnection from "../configs/dbConnection.js";
import UserSettings from "../models/UserSettings.js";

export const createUserSettingsData = async (data) => {
  const userSettings = UserSettings.create({ ...data });
};

export const getUserSettingsData = async (id) => {
  return UserSettings.findByPk(id);
};

export const getUserSettingsDataByUserId = async (userId) => {
  const userSettingsData = await UserSettings.findOne({ userId });
  if (userSettingsData) {
    return userSettingsData;
  }
  return null;
};

export const editUserSettingsData = async (userId, data) => {
  console.log(data);
  const userSettings = await getUserSettingsDataByUserId(userId);
  if (userSettings) {
    return userSettings.update(data);
  }
  return null;
};

export const deleteUserSettingsData = async (id, data) => {
  const userSettings = await getUserSettingsData(id);
  if (userSettings) {
    return userSettings.destroy();
  }
  return null;
};
