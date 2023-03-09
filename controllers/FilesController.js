import { addUploadedFilesData, getPhotoWithId, getUserPhotos } from "../services/FileService.js";

export const uploadFilesRoute = (req, res) => {
  const userId = req.user;

  addUploadedFilesData(userId, req.files)
    .then((result) => {
      return res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(401);
    });
};

export const getPhotoPathWithIdRoute = (req, res) => {
  const photoId = req.params.id;
  getPhotoWithId(photoId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ success: false, reason: "Not found" });
      }
      return res.status(200).json({ id: result.id, path: result.path });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400);
    });
};

export const getUserPhotosRoute = (req, res) => {
  const userId = req.params.userId;
  getUserPhotos(userId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ success: false, reason: "Not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
