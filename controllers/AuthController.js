import { getUserIdByEmailOrUsername, authenticateUser } from "../services/UserAuthService";

export const singupRoute = (req, res) => {
  const { authfield, password } = req.body;
  //TODO
  //check if user already exists in db
  //if yes, send back information that account already exists
  //if not
  //check if all the data is valid
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
