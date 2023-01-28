import { Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

router.route("/").get().post();
router.route("/:id").get().patch().delete();

//create user
//get user
// edit user
// delete user

export default router;
