import { Router } from "express";
import { addFriendRoute, createFriendRequestRoute, getUserFriendsRoute, removeFriendRequestRoute, removeFriendRoute } from "../controllers/FriendController.js";

const router = Router();

router.route("/").get(getUserFriendsRoute).post(addFriendRoute).delete(removeFriendRoute);
router.route("/request").post(createFriendRequestRoute).delete(removeFriendRequestRoute);

export default router;
