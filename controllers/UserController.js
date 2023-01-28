import { validationResult } from "express-validator";
import User from "../models/User.js";
import createNewUser from "../services/UserService.js";

export const createNewUser = (req, res) => {
  //validate data
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ validationErrors: validationErrors.array() });
  }

  const user = createNewUser({ ...req.body });
  //check if user has been successfully created
  //
};
