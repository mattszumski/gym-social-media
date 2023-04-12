import { addUploadedFilesData, getPhotoWithId, getUserPhotos, createPhotoThumbnails, getUserProfilePhotoData } from "../services/FileService.js";
import { Request, Response } from "express";
import ExtendedIncomingFile from "../types/ExtendedIncomingFile.js";

const photoSizes = ["sm", "md"];

export const uploadFilesRoute = (req: Request, res: Response) => {
  const userId = req.user as number;

  if (!req.files) {
    return res.sendStatus(400);
  }

  const files = req.files as unknown as ExtendedIncomingFile[];
  createPhotoThumbnails(files);

  addUploadedFilesData(userId, files)
    .then((result) => {
      return res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(401);
    });
};

export const getPhotoPathWithIdRoute = (req: Request, res: Response) => {
  const photoId = req.params.id;
  getPhotoWithId(parseInt(photoId))
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

export const getUserPhotosRoute = (req: Request, res: Response) => {
  const userId = req.params.userId;

  getUserPhotos(parseInt(userId))
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

export const getUserProfilePhotoRoute = (req: Request, res: Response) => {
  const userId = req.params.userId;

  getUserProfilePhotoData(parseInt(userId))
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

export const getResizedUserProfilePhotoRoute = (req: Request, res: Response) => {
  const { userId, size } = req.params;
  if (!photoSizes.includes(size)) {
    return res.status(400).json({ msg: "Incorrect photo size" });
  }

  getUserProfilePhotoData(parseInt(userId))
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

export const insertPostPhotos = (userId: number, postId: number, photos: ExtendedIncomingFile[]) => {
  createPhotoThumbnails(photos);
  return addUploadedFilesData(userId, photos, postId);
};
