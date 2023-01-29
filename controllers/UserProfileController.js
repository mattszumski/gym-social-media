import { createUserProfileData, editUserProfileData, getUserProfileDataByUserId } from "../services/UserProfileService.js";

export const getUserProfileRoute = (req, res) => {
  const userId = req.params.id;
  getUserProfileDataByUserId(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(404);
    });
};

export const editUserProfileRoute = async (req, res) => {
  const profileData = await getUserProfileRoute(req.params.id);

  editUserProfileData(profileData.id, req.body);
};
