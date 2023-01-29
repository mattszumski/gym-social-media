import dbConnection from "../configs/dbConnection.js";
import UserSettings from "../models/UserSettings.js";

export const createUserSettingsData = async (data) => {
  const userSettings = UserSettings.create({ ...data });
};

export const getUserSettingsData = async (id) => {
  return UserSettings.findByPk(id);
};

export const getUserSettingsDataByUserId = async (userId) => {
  const userSettings = UserSettings.findOne({ userId });
  if (userSettings) {
    return UserSettings;
  }

  return null;
};

export const editUserSettingsData = async (id, data) => {
  const userSettings = await getUserSettingsData(id);
  if (userSettings) {
    return userSettings.update({ id, ...data });
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
