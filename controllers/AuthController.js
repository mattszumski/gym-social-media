import { authenticateUser } from "../services/UserAuthService";
import { checkIfUserExistsInDb } from "../services/UserService";

export const singupRoute = (req, res) => {
  const { username, email, password } = req.body;
  //TODO
  //check if user already exists in db
  const userExists = checkIfUserExistsInDb(email, username);
  if (userExists) {
    //if yes, send back information that account already exists
    return res.status(400).json({ success: false, reason: "User with this username/e-mail already exists" });
  }
  //if not
  //check if all the data is valid -(what kind of data?)
  //create user

  //log in user
};

export const loginRoute = (req, res) => {
  const { authfield, password } = req.body;
  const user = getUserIdByEmailOrUsername(authfield);
  if (!user) {
    res.status(400).json({ success: false, reason: `User not found` });
  }

  const authResult = authenticateUser(user.id, password);
  res.sendStatus(200);
  //TODO:
  //if success, send back token
  //if failure, send back error
};

export const logoutRoute = (req, res) => {
  //TODO
};
