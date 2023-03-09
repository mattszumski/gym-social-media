import { Router } from "express";
import passport from "passport";
import multer from "multer";
import { uploadFilesRoute, getPhotoPathWithIdRoute, getUserPhotosRoute } from "../controllers/FilesController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage });

const router = Router();

// router.use();
router.route("/").post(passport.authenticate("jwt", { session: false }), uploads.array("files"), uploadFilesRoute);
router.route("/photo/:id").get(getPhotoPathWithIdRoute);
router.route("/userPhotos/:userId").get(getUserPhotosRoute);

export default router;
