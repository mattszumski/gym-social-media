import { createUserProfileData, editUserProfileData, getUserProfileDataByUserId } from "../services/UserProfileService.js";

export const getUserProfileRoute = (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ success: false, reason: "User not found" });
  }
  console.log(userId);
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
  const userId = req.params.id;
  if (parseInt(userId) !== req.user) {
    return res.status(403).json({ success: false, reason: "Access denied" });
  }
  getUserProfileDataByUserId(userId)
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
