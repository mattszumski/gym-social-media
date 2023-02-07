import { Router } from "express";
import { verify } from "jsonwebtoken";
import UserAuth from "../models/UserAuth.js";
import { loginRoute } from "../controllers/AuthController.js";

const router = Router();

//route for login
router.route("/login").get(loginRoute);
//route for logout
//route for signup
