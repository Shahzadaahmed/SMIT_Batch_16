// All user related routes are defined herr...!

import express from "express";
import {
  welcomeToDB,
  createUser,
  logInUser
} from "../../controllers/user-controller/user-controller.js";
import adminOnly from "../../middlewares/adminOnly.js";

const router = express.Router();

// Note: / api route api defined here...!
router.route("/").get(welcomeToDB);

// Note: / api route api to save user in DB...!
router.route("/save/:adminId").post(adminOnly, createUser);

// Note: / api route api to login user...!
router.route('/login').post(logInUser);

export default router;
