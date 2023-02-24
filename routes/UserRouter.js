import { Router } from "express";
import passport from "passport";
import { createNewUserRoute, deleteUserWithIdRoute, editUserWithIdRoute, getAllUsersRoute, getUserDataRoute, getUserWithIdRoute } from "../controllers/UserController.js";
import { editUserProfileRoute, getUserProfileRoute } from "../controllers/UserProfileController.js";
import { getUserData } from "../services/UserService.js";

//DEV
import { getUserAuthDataByLogin, authenticateUser } from "../services/UserAuthService.js";
import { hashPassword } from "../utils/AuthUtils.js";

const router = Router();

router.route("/").get(getAllUsersRoute);
router
  .route("/:id")
  .get(getUserWithIdRoute)
  .patch(passport.authenticate("jwt", { session: false }), editUserWithIdRoute)
  .delete(passport.authenticate("jwt", { session: false }), deleteUserWithIdRoute);
router
  .route("/profile/:id")
  .get(getUserProfileRoute)
  .patch(passport.authenticate("jwt", { session: false }), editUserProfileRoute);
//TODO
router.route("/settings/:id").get().patch();
router.route("/data/:id").get(passport.authenticate("jwt", { session: false }), getUserDataRoute);

export default router;
