import { Router } from "express";
import { createNewUserRoute, deleteUserWithIdRoute, editUserWithIdRoute, getAllUsersRoute, getUserDataRoute, getUserWithIdRoute } from "../controllers/UserController.js";
import { editUserProfileRoute, getUserProfileRoute } from "../controllers/UserProfileController.js";
import { getUserData } from "../services/UserService.js";

//DEV
import { getUserAuthDataByLogin, authenticateUser } from "../services/UserAuthService.js";
import { hashPassword } from "../utils/AuthUtils.js";

const router = Router();

router.route("/test").get(async (req, res) => {
  const input = req.body.input;
  const user = await getUserAuthDataByLogin(input);
  return res.sendStatus(200);
});

router.route("/pass").post(async (req, res) => {
  const { password } = req.body;
  console.log(password);
  const saltAndHash = hashPassword(password);
  return res.status(200).json(saltAndHash);
});

router.route("/").get(getAllUsersRoute).post(createNewUserRoute);
router.route("/:id").get(getUserWithIdRoute).patch(editUserWithIdRoute).delete(deleteUserWithIdRoute);
router.route("/profile/:id").get(getUserProfileRoute).patch(editUserProfileRoute);
router.route("/settings/:id").get().patch();
router.route("/data/:id").get(getUserDataRoute);

router.route("/test/:id").get((req, res) => {
  const userId = req.params.id;
  getUserData(userId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

export default router;
