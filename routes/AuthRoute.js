import { Router } from "express";
import { loginRoute, logoutRoute, singupRoute } from "../controllers/AuthController.js";

const router = Router();

router.route("/login").post(loginRoute);
router.route("/logout").get(logoutRoute);
router.route("/signup").post(singupRoute);

export default router;
