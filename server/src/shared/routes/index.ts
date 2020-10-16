import express from "express";
import { sessionController, signUpController } from "../controllers";
import session from "../middleware/session";
var router = express.Router();

router.post("/authorize", (req, res) => sessionController.post(req, res));

router.post("/signup", (req, res) => signUpController.post(req, res));

router.use(session);

export { router };
