import express from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import {
  sessionController,
  signUpController,
  profileController,
} from "../controllers";
import session from "../middleware/session";
var upload = multer(multerConfig);
var router = express.Router();

router.post("/authorize", (req, res) => sessionController.post(req, res));

router.post("/signup", (req, res) => signUpController.post(req, res));

router.put("/users/me", upload.single("image"), (req, res) =>
  profileController.put(req, res)
);

router.use(session);

export { router };
