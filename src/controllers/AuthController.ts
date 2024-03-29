import { authenticateUser, getUserIdByEmailOrUsername, createUserAuthInDb, createLogoutToken } from "../services/UserAuthService.js";
import { checkIfUserExistsInDb, createUserInDb } from "../services/UserService.js";
import { getBearerTokenFromReq } from "../utils/AuthUtils.js";
import { addToBlacklist } from "../services/TokenService.js";
import { Request, Response } from "express";
import { IUser } from "../types/Interfaces/UserInterfaces.js";

const httpCookieOptions = {
  maxAge: 60 * 60 * 24 * 1000,
  secure: false,
  httpOnly: true,
};

export const singupRoute = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, reason: "Required data is missing" });
  }

  const userExists = await checkIfUserExistsInDb(email, username);
  if (userExists) {
    return res.status(400).json({ success: false, reason: "User with this username/e-mail already exists" });
  }

  const newUser = await createUserInDb({ username, email }).catch((error) => {
    console.log(error);
    return res.status(400).json({ success: false, reason: "Something went wrong with user creation" });
  });

  if (!newUser) {
    return res.status(400).json({ success: false, reason: "Something went wrong with user creation" });
  }

  const createdUser = newUser as IUser;

  createUserAuthInDb(createdUser.id!, password)
    .then(async (result) => {
      const token = await authenticateUser(createdUser.id!, password);
      return res.cookie("token", token, httpCookieOptions).json({ userId: createdUser.id, username: createdUser.username, accessToken: token }).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, reason: "Something went wrong with user creation" });
    });
};

export const loginRoute = async (req: Request, res: Response) => {
  const { authfield, password } = req.body;
  if (!authfield || !password) {
    return res.status(400).json({ success: false, reason: `Required data is missing` });
  }

  const user = await getUserIdByEmailOrUsername(authfield);
  if (!user) {
    return res.status(400).json({ success: false, reason: `User not found` });
  }

  const authResult = await authenticateUser(user.id!, password);
  if (authResult.length > 0) {
    return res.cookie("token", authResult, httpCookieOptions).json({ userId: user.id, username: user.username, accessToken: authResult }).send();
  }
  return res.sendStatus(401);
};

export const logoutRoute = (req: Request, res: Response) => {
  addToBlacklist(getBearerTokenFromReq(req));
  const logoutToken = createLogoutToken();
  return res.cookie("token", logoutToken, { maxAge: 0, secure: false, httpOnly: true }).send();
};
