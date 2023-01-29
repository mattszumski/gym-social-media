import dbConnection from "../configs/dbConnection.js";
import UserProfile from "../models/UserProfile.js";

export const createUserProfileData = async (data) => {
  const userProfile = UserProfile.create({ ...data });
};

export const getUserProfileData = async (id) => {
  return UserProfile.findByPk(id);
};

export const getUserProfileDataByUserId = async (userId) => {
  const userProfile = UserProfile.findOne({ where: { userId } });
  if (userProfile) {
    return UserProfile;
  }

  return null;
};

export const editUserProfileData = async (id, data) => {
  const userProfile = await getUserProfileData(id);
  if (userProfile) {
    return userProfile.update({ id, ...data });
  }
  return null;
};

export const deleteUserProfileData = async (id, data) => {
  const userProfile = await getUserProfileData(id);
  if (userProfile) {
    return userProfile.destroy();
  }
  return null;
};
