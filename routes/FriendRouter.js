import { Router } from "express";
import passport from "passport";
import { addFriendRoute, createFriendRequestRoute, getUserFriendsRoute, removeFriendRequestRoute, removeFriendRoute } from "../controllers/FriendController.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));
router.route("/").get(getUserFriendsRoute).post(addFriendRoute).delete(removeFriendRoute);
router.route("/request").post(createFriendRequestRoute).delete(removeFriendRequestRoute);

export default router;
