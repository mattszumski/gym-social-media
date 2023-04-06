import { Router } from "express";
import passport from "passport";
import { uploadFilesRoute, getPhotoPathWithIdRoute, getUserPhotosRoute, getUserProfilePhotoRoute, getResizedUserProfilePhotoRoute } from "../controllers/FilesController.js";
import uploads from "../configs/MulterConfig.js";

const router = Router();

// router.use();
router.route("/").post(passport.authenticate("jwt", { session: false }), uploads.array("files"), uploadFilesRoute);
router.route("/photo/:id").get(getPhotoPathWithIdRoute);
router.route("/userPhotos/:userId").get(getUserPhotosRoute);
router.route("/userPhotos/:userId/profile").get(getUserProfilePhotoRoute);
router.route("/userPhotos/:userId/profile/:size").get(getResizedUserProfilePhotoRoute);

export default router;
