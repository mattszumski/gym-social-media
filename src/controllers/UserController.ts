import { validationResult } from "express-validator";
import { addUploadedFilesData, createPhotoThumbnails } from "../services/FileService.js";
import { createUserInDb, getDbUsers, getDbUserWithId, editDbUserWithId, deleteDbUserWithId, getUserData } from "../services/UserService.js";
import { setUserProfilePicture } from "../services/UserProfileService.js";
import { Request, Response } from "express";
import ExtendedIncomingFile from "../utils/types/ExtendedIncomingFile.js";

//CHECK IF NEEDED
export const createNewUserRoute = (req: Request, res: Response) => {
  //validate data
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ validationErrors: validationErrors.array() });
  }

  //check password

  createUserInDb({ ...req.body })
    .then((result) => {
      return res.sendStatus(201);
      //TODO
      //create userAuth file with authorization information
    })
    .catch((error) => {
      console.log(error);
      console.log("error");
      return res.sendStatus(400);
    });
  //TODO: ERROR_HANDLING, check if user has been successfully created
};

export const getAllUsersRoute = (req: Request, res: Response) => {
  //TODO: To be used only with filters (users looks for other users by search)
  const { q } = req.query;
  getDbUsers(q)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

export const getUserWithIdRoute = (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ success: false, reason: "User not found" });
  }
  getDbUserWithId(userId)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

export const getUserDataRoute = (req: Request, res: Response) => {
  const userId = req.params.id;
  if (parseInt(userId) !== req.user) {
    //TODO: create new route for userInformation that can be safetly sent to client
    // return res.status(403).json({ success: false, reason: "Access denied" });
  }

  getUserData(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};

export const editUserWithIdRoute = (req: Request, res: Response) => {
  const userId = req.params.id;
  if (parseInt(userId) !== req.user) {
    return res.status(403).json({ success: false, reason: "Access denied" });
  }

  editDbUserWithId(userId, req.body)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

export const deleteUserWithIdRoute = (req: Request, res: Response) => {
  const userId = req.params.id;

  if (parseInt(userId) !== req.user) {
    return res.status(403).json({ success: false, reason: "Access denied" });
  }

  deleteDbUserWithId(userId)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

export const uploadProfilePictureRoute = async (req: Request, res: Response) => {
  const userId = req.user;

  if (!req.files) {
    return res.sendStatus(400);
  }

  if (req.files.length == 0) {
    return res.sendStatus(400);
  }

  const files = req.files as unknown as ExtendedIncomingFile[];
  const file = files.at(0);

  if (!file) {
    return res.sendStatus(400);
  }

  //TODO (Backlog) : Create more sophisticated method to check if the uploaded file type is accepted
  if (file.mimetype.substring(0, 6).valueOf() !== "image/".valueOf()) {
    return res.sendStatus(400);
  }
  createPhotoThumbnails(req.files);
  const fileData = await addUploadedFilesData(userId, req.files);
  if (!fileData) {
    return res.sendStatus(500);
  }

  if (!fileData.at(0)) {
    return res.sendStatus(500);
  }
  const fileId = fileData.at(0)?.id;

  setUserProfilePicture(userId, fileId);
  //TODO: Check for errors
  res.sendStatus(200);
};
