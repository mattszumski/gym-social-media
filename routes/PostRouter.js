import { Router } from "express";
import passport from "passport";
import {
  createPostRoute,
  deletePostRoute,
  editPostRoute,
  getPostRoute,
  getPostForUserRoute,
  getPostForUserDashboardRoute,
  addPostCommentRoute,
  getPostCommentsRoute,
  editPostCommentRoute,
  deletePostCommentRoute,
} from "../controllers/PostController.js";
import uploads from "../configs/MulterConfig.js";

const router = Router();

router.route("/").post(passport.authenticate("jwt", { session: false }), uploads.array("files"), createPostRoute);

router
  .route("/comment/")
  .get(passport.authenticate("jwt", { session: false }), getPostCommentsRoute)
  .post(passport.authenticate("jwt", { session: false }), addPostCommentRoute);

router
  .route("/comment/:commentId")
  .patch(passport.authenticate("jwt", { session: false }), editPostCommentRoute)
  .delete(passport.authenticate("jwt", { session: false }), deletePostCommentRoute);

router
  .route("/:postId")
  .get(getPostRoute)
  .patch(passport.authenticate("jwt", { session: false }), editPostRoute)
  .delete(passport.authenticate("jwt", { session: false }), deletePostRoute);

router.route("/user/my").get(passport.authenticate("jwt", { session: false }), getPostForUserDashboardRoute);
router.route("/user/:userId").get(getPostForUserRoute);

export default router;
