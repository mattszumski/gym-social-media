import { Router } from "express";
import passport from "passport";
import {
  addFriendRoute,
  createFriendRequestRoute,
  getFriendRequestsSentRoute,
  getUserFriendRequestsRoute,
  getUserFriendsRoute,
  removeFriendRequestRoute,
  removeFriendRoute,
  acceptFriendRequestRoute,
  cancelFriendRequestRoute,
} from "../controllers/FriendController.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));
router.route("/").get(getUserFriendsRoute).post(addFriendRoute).delete(removeFriendRoute);
router.route("/request").get(getUserFriendRequestsRoute).post(createFriendRequestRoute).delete(removeFriendRequestRoute);
router.route("/request/accept").post(acceptFriendRequestRoute);
router.route("/request/cancel").post(cancelFriendRequestRoute);
router.route("/request/sent").get(getFriendRequestsSentRoute);

export default router;
