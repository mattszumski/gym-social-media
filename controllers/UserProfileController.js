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
  getUserProfileDataByUserId(req.params.id)
    .then(async (result) => {
      if (!result) {
        return res.status(400).json({ success: false, reason: "Not found" });
      }

      const updateResult = await editUserProfileData(result.id, req.body);
      if (updateResult) {
        return res.status(200).json(updateResult);
      }
      return res.status(400).json({ success: false, reason: "Profile not updated" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404);
    });
};
