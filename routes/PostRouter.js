import { Router } from "express";
import passport from "passport";
import { createPostRoute, deletePostRoute, editPostRoute, getPostRoute, getPostForUserRoute, getPostForUserDashboardRoute } from "../controllers/PostController.js";
import uploads from "../configs/MulterConfig.js";

const router = Router();

router.route("/").post(passport.authenticate("jwt", { session: false }), uploads.array("files"), createPostRoute);
router
  .route("/:postId")
  .get(getPostRoute)
  .patch(passport.authenticate("jwt", { session: false }), editPostRoute)
  .delete(passport.authenticate("jwt", { session: false }), deletePostRoute);
router.route("/user/my").get(passport.authenticate("jwt", { session: false }), getPostForUserDashboardRoute);
router.route("/user/:userId").get(getPostForUserRoute);

export default router;
