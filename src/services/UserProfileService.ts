import UserProfile from "../models/UserProfile.js";
import { IUserProfile } from "../types/Interfaces/UserInterfaces.js";

export const createUserProfileData = async (data: IUserProfile) => {
  const userProfile = UserProfile.create({ ...data });
};

export const getUserProfileData = async (id: number) => {
  return UserProfile.findByPk(id);
};

export const getUserProfileDataByUserId = async (userId: number) => {
  const userProfileData = await UserProfile.findOne({ where: { userId } });
  if (userProfileData) {
    return userProfileData;
  }

  return null;
};

export const editUserProfileData = async (id: number, data: IUserProfile) => {
  const userProfile = await getUserProfileData(id);
  if (userProfile) {
    return userProfile.update({ id, ...data });
  }
  return null;
};

export const deleteUserProfileData = async (id: number) => {
  const userProfile = await getUserProfileData(id);
  if (userProfile) {
    return userProfile.destroy();
  }
  return null;
};

export const setUserProfilePicture = (userId: number, fileId: number) => {
  editUserProfileData(userId, { profilePhotoId: fileId })
    .then((result) => {
      if (!result) {
        throw `User profile doesn't exists for userId=${userId}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
