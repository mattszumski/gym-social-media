import { Router } from "express";
import { createPostRoute, deletePostRoute, editPostRoute, getPostRoute, getPostForUserRoute, getPostForUserDashboardRoute } from "../controllers/PostController.js";

const router = Router();

router.route("/").post(createPostRoute);
router.route("/:postId").get(getPostRoute).patch(editPostRoute).delete(deletePostRoute);
router.route("/user/my").get(getPostForUserDashboardRoute);
router.route("/user/:user").get(getPostForUserRoute);

export default router;
