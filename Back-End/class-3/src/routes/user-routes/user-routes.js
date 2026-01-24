// All user related routes are defined herr...!

import express from "express";
import { welcomeToDB } from "../../controllers/user-controller/user-controller.js";

const router = express.Router();

// Note: / api route api defined here...!
router.route('/').get(welcomeToDB);

router.route('/users/fetch/all').get(welcomeToDB);

export default router;