import { Router } from "express";
import passport from "passport";
import multer from "multer";
import path from "path";
import { uploadFilesRoute } from "../controllers/FilesController.js";

const uploads = multer({ dest: "data/uploads/" });

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));
router.route("/").post(uploads.array("files"), uploadFilesRoute);

export default router;
