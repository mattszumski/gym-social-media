import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createNewUserRoute, getAllUsersRoute, getUserWithIdRoute, getUserDataRoute, editUserWithIdRoute, deleteUserWithIdRoute } from "../controllers/UserController.js";
import { editUserProfileRoute, getUserProfileRoute } from "../controllers/UserProfileController.js";
import { getUserData } from "../services/UserService.js";

const router = Router();

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
