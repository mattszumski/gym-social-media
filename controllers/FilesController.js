import { addUploadedFilesData, getPhotoWithId, getUserPhotos, createPhotoThumbnails, getUserProfilePhotoData } from "../services/FileService.js";

const photoSizes = ["sm", "md"];

export const uploadFilesRoute = (req, res) => {
  const userId = req.user;

  createPhotoThumbnails(req.files);

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

export const getUserProfilePhotoRoute = (req, res) => {
  const userId = req.params.userId;

  getUserProfilePhotoData(userId)
    .then((result) => {
      let path = "";
      let found = false;
      if (result) {
        path = result.path;
        found = true;
      }
      return res.status(200).json({ found, path });
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};

export const getResizedUserProfilePhotoRoute = (req, res) => {
  const { userId, size } = req.params;
  if (!photoSizes.includes(size)) {
    return res.status(400).json({ msg: "Incorrect photo size" });
  }

  getUserProfilePhotoData(userId)
    .then((result) => {
      let path = "";
      let found = false;
      if (result) {
        path = result.path.replace("/media/", `/media/${size}-`);
        found = true;
      }
      return res.status(200).json({ found, path });
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};
