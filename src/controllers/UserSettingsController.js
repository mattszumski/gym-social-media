import { editUserSettingsData, getUserSettingsDataByUserId } from "../services/UserSettingsService.js";

export const getUserSettingsRoute = (req, res) => {
  const userId = req.user;
  getUserSettingsDataByUserId(userId)
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(400).json({ success: false, reason: "Bad request" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ success: false, reason: "Bad request" });
    });
};

//patch user settings
export const editUserSettingsRoute = (req, res) => {
  const userId = req.user;
  editUserSettingsData(userId, req.body)
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(400).json({ success: false, reason: "Bad request" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ success: false, reason: "Bad request" });
    });
};
