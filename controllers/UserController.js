import { validationResult } from "express-validator";
import { createUserInDb, getDbUsers, getDbUserWithId, editDbUserWithId, deleteDbUserWithId, getUserData } from "../services/UserService.js";

//CHECK IF NEEDED
export const createNewUserRoute = (req, res) => {
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

export const getAllUsersRoute = (req, res) => {
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

export const getUserWithIdRoute = (req, res) => {
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

export const getUserDataRoute = (req, res) => {
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

export const editUserWithIdRoute = (req, res) => {
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

export const deleteUserWithIdRoute = (req, res) => {
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
