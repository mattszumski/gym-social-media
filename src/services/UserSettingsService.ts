import UserSettings from "../models/UserSettings.js";
import { IUserSettings } from "../types/Interfaces/UserInterfaces.js";

export const createUserSettingsData = async (data: IUserSettings) => {
  const userSettings = UserSettings.create({ ...data });
};

export const getUserSettingsData = async (id: number) => {
  return UserSettings.findByPk(id);
};

export const getUserSettingsDataByUserId = async (userId: number) => {
  const userSettingsData = await UserSettings.findOne({ where: { userId } });
  if (userSettingsData) {
    return userSettingsData;
  }
  return null;
};

export const editUserSettingsData = async (userId: number, data: IUserSettings) => {
  const userSettings = await getUserSettingsDataByUserId(userId);
  if (userSettings) {
    return userSettings.update(data);
  }
  return null;
};

export const deleteUserSettingsData = async (id: number) => {
  const userSettings = await getUserSettingsData(id);
  if (userSettings) {
    return userSettings.destroy();
  }
  return null;
};
