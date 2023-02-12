import { authenticateUser, getUserIdByEmailOrUsername, createUserAuthInDb } from "../services/UserAuthService.js";
import { checkIfUserExistsInDb, createUserInDb } from "../services/UserService.js";

const httpCookieOptions = {
  maxAge: 60 * 60 * 24 * 1000,
  secure: false,
  httpOnly: true,
};

export const singupRoute = async (req, res) => {
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
  });
  if (!newUser) {
    return res.status(400).json({ success: false, reason: "Something went wrong with user creation" });
  }

  createUserAuthInDb(newUser.id, password)
    .then((result) => {
      console.log(result);
      const token = authenticateUser(newUser.id, password);
      res.status(201).cookie("token", token, httpCookieOptions).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, reason: "Something went wrong with user creation" });
    });
};

export const loginRoute = async (req, res) => {
  const { authfield, password } = req.body;

  const user = await getUserIdByEmailOrUsername(authfield);
  if (!user) {
    res.status(400).json({ success: false, reason: `User not found` });
  }

  const authResult = await authenticateUser(user.id, password);
  //TODO:
  //if success, send back token
  if (authResult.length > 0) {
    return res.cookie("token", authResult, httpCookieOptions).send();
  }
  //if failure, send back error
  return res.sendStatus(401);
};

export const logoutRoute = (req, res) => {
  //TODO
};
