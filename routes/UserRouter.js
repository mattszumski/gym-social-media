import { Router } from "express";
import passport from "passport";
import { deleteUserWithIdRoute, editUserWithIdRoute, getAllUsersRoute, getUserDataRoute, getUserWithIdRoute } from "../controllers/UserController.js";
import { editUserProfileRoute, getUserProfileRoute } from "../controllers/UserProfileController.js";
import { getUserSettingsRoute, editUserSettingsRoute } from "../controllers/UserSettingsController.js";

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
router
  .route("/settings/:id")
  .get(passport.authenticate("jwt", { session: false }), getUserSettingsRoute)
  .patch(passport.authenticate("jwt", { session: false }), editUserSettingsRoute);
router.route("/data/:id").get(passport.authenticate("jwt", { session: false }), getUserDataRoute);

export default router;
