import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createNewUserRoute, getAllUsersRoute, getUserWithIdRoute, editUserWithIdRoute, deleteUserWithIdRoute } from "../controllers/UserController.js";
import { editUserProfileRoute, getUserProfileRoute } from "../controllers/UserProfileController.js";

const router = Router();

router.route("/").get(getAllUsersRoute).post(createNewUserRoute);
router.route("/:id").get(getUserWithIdRoute).patch(editUserWithIdRoute).delete(deleteUserWithIdRoute);
router.route("/profile/:id").get(getUserProfileRoute).patch(editUserProfileRoute);
router.route("/settings/:id").get().patch();

export default router;
